import "./ExploreContainer.css";
import AuthCard from "./Auth/AuthCard";
import SignInForm from "./Auth/SignInForm";
import { useFormik } from "formik";
import { validationSchemaSignIn } from "./Auth/SignInForm/validations";
import { Box } from "@chakra-ui/react";
interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const formik = useFormik<any>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemaSignIn,
    validateOnMount: true,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: (values) => console.log(values),
  });

  return (
    <Box bg='mirage' padding='24px' className="container">
      <AuthCard>
        <SignInForm error={""} loading={false} formik={formik} />
      </AuthCard>
    </Box>
  );
};

export default ExploreContainer;
