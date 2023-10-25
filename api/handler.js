"use strict";

const OpenAI = require("openai");
const settings = require("./openai_prompt.json");
const role_data = require("./role_data.json");
const openai = new OpenAI({ apiKey: "" });

module.exports.generateQuestions = async (event) => {
  const { resume, role, level } = JSON.parse(event.body);
  const validate = (role, level) =>
    role_data.levels.includes(parseInt(level)) && role_data.roles.map((item) => item.name).includes(role);

  if (!resume || !role || !level || !validate(role, level)) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: "Invalid form input.",
      }),
    };
  }

  const question_builder = async (resume) => {
    const messageBuilder = (resume) => {
      return {
        role: "user",
        content: `Role: ${role}\nLevel: ${level}\nResume: ${resume}`,
      };
    };
    const response = await openai.createChatCompletion({
      ...settings.question_builder,
      messages: [...settings.question_builder.messages, messageBuilder(resume)],
    });

    return response.choices[0].message.content;
  };

  const json_fix = async (json_string) => {
    const messageBuilder = (json_string) => {
      return {
        role: "user",
        content: json_string,
      };
    };

    return JSON.parse(
      (
        await openai.createChatCompletion({
          ...settings.json_fix,
          messages: [...settings.json_fix.messages, messageBuilder(json_string)],
        })
      ).choices[0].message.content
    );
  };

  try {
    console.log(resume);
    const questions = await question_builder(JSON.stringify(resume));
    const response = await json_fix(questions);
    console.log(response);

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred while generating the questions.",
      }),
    };
  }
};

module.exports.resumeStandardizer = async (event) => {
  const { resume } = JSON.parse(event.body);

  if (!resume || resume.length < 100) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: "Invalid form input.",
      }),
    };
  }

  const resume_standardizer = async () => {
    const messageBuilder = (resume) => {
      return {
        role: "user",
        content: resume,
      };
    };
    return JSON.parse(
      (
        await openai.createChatCompletion({
          ...settings.resume_standardizer,
          messages: [...settings.resume_standardizer.messages, messageBuilder(resume)],
        })
      ).choices[0].message.content
    );
  };

  try {
    const resume_json = await resume_standardizer();
    console.log(resume_json);
    return {
      statusCode: 200,
      body: JSON.stringify(resume_json),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred while converting your resume.",
      }),
    };
  }
};
