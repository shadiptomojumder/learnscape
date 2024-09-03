import { SignupForm } from "../_components/signup-form";

const RegisterPage: React.FC<{ params: { role: string } }> = ({ params: { role } }) => {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container">
        <SignupForm role={role}/>
      </div>
    </div>
  );
};
export default RegisterPage;
