import React, { useState } from "react";
import {
    Button,
    Container,
    TextField, Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    SelectChangeEvent
} from "@mui/material";

const ResumeForm: React.FC = () => {
  const [role, setRole] = useState<string | undefined>(undefined);
  const [level, setLevel] = useState<number | undefined>(undefined);

  const [resume, setResume] = useState<string>("");
  const [roleError, setRoleError] = useState<boolean>(false);
  const [lvlError, setLvlError] = useState<boolean>(false);

  const handleRoleChange = (event: SelectChangeEvent<{ value: string }>) => {
    setRole(event.target.value as string);
    setRoleError(false);
  };

  const handleLevelChange = (event: SelectChangeEvent<{ value: number }>) => {
    setLevel(event.target.value as number);
    setLvlError(false);
  };

  const handleResumeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResume(event.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let failed = false;
    if (!role) {
      setRoleError(true);
      failed = true;
    }
    if (!level) {
      setLvlError(true);
      failed = true;
    }
    if (failed) {
      return;
    } else {
      // Process form data and send it to the backend API
    }
  };

  return (
    <Container>
      <form onSubmit={handleFormSubmit}>
        <TextField
          fullWidth
          multiline
          rows={10}
          //   variant="outlined"
          placeholder="Paste your resume here"
          margin="normal"
          value={resume}
          onChange={handleResumeChange}
        />
        <FormControl fullWidth variant="outlined" margin="normal" error={roleError}>
          <InputLabel id="role-label">Select job role</InputLabel>
          <Select
            labelId="role-label"
            value={role ?? ""}
            type="string"
            onChange={handleRoleChange}
            label="Select job role"
          >
            <MenuItem value="Software Engineer">Software Engineer</MenuItem>
            <MenuItem value="Site Reliability Engineer">Site Reliability Engineer</MenuItem>
            <MenuItem value="Test Engineer">Test Engineer</MenuItem>
            <MenuItem value="Data Analyst">Data Analyst</MenuItem>
            <MenuItem value="Data Scientist">Data Scientist</MenuItem>
            <MenuItem value="Data Engineer">Data Engineer</MenuItem>
          </Select>
          {roleError && <FormHelperText>Role is required</FormHelperText>}
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal" error={lvlError}>
          <InputLabel id="level-label">Select job level</InputLabel>
          <Select
            labelId="level-label"
            value={level || ""}
            type="number"
            onChange={handleLevelChange}
            label="Select job level"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
          {lvlError && <FormHelperText>Level is required</FormHelperText>}
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: "16px" }}
        >
          Generate Questions
        </Button>
      </form>
    </Container>
  );
};

export default ResumeForm;
