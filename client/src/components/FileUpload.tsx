import { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useUploadFileMutation } from "../app/api";

export default function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [upload, { isLoading, isSuccess, isError, error, data }] =
    useUploadFileMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] ?? null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    await upload(formData);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upload Dataset
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Button variant="outlined" component="label">
          Choose File
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
          />
        </Button>
        <Typography variant="body2" color="text.secondary">
          {selectedFile ? selectedFile.name : "No file selected"}
        </Typography>
        <Button
          variant="contained"
          startIcon={
            isLoading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />
          }
          onClick={handleUpload}
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </Box>
      {isSuccess && (
        <Alert severity="success">
          {data?.message} ({data?.rowCount} rows imported)
        </Alert>
      )}
      {isError && (
        <Alert severity="error">
          {(error as { data?: { error?: string } })?.data?.error ??
            "Upload failed"}
        </Alert>
      )}
    </Box>
  );
}
