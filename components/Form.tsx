"use client";
import { postData } from "@/utils/dataservices";
import { Button, CircularProgress, Container, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Tasks } from "./Tasks";
import { useRouter } from "next/navigation";

interface FormProps {
  tasks: { title: string; id: number }[];
}

interface IFormInput {
  title: string;
}

export const Form: FC<FormProps> = ({ tasks }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      id: "",
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    await postData({ url: "/tasks", data: data });
    setLoading(false);
    reset();
    router.refresh();
  };

  type Rules = {
    required: {
      value: boolean;
      message: string;
    };
    maxLength: {
      value: number;
      message: string;
    };
  };
  const rules: Rules = {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 15,
      message: "more than 15",
    },
  };
  return (
    <Container maxWidth="xs">
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={errors.title ? true : false} message={errors.title?.message} />
      <Stack
        alignItems="center"
        marginTop="5rem"
        borderRadius="10px"
        padding="1rem"
        minHeight="30rem"
        sx={(theme) => ({
          boxShadow: theme.shadows[4],
          backgroundImage:
            "linear-gradient(to right top, #89b9ad, #90c0ad, #9ac7ac, #a6ceab, #b3d4a9, #c0d8aa, #cedbac, #dbdfaf, #e8e1b7, #f2e4c1, #fae7cc, #ffebd8)",
        })}
      >
        <Typography variant="h4" gutterBottom>
          Tasks
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="row" gap="1rem" justifyContent="space-between">
            <Controller
              name="title"
              control={control}
              rules={rules}
              render={({ field }) => <TextField variant="outlined" size="small" {...field} />}
            />
            <Button type="submit" variant="outlined" sx={{ width: "5.2rem" }}>
              {loading ? <CircularProgress size="1.3rem" /> : "Submit"}
            </Button>
          </Stack>
        </form>
        <Tasks data={tasks} />
      </Stack>
    </Container>
  );
};

export default Form;
