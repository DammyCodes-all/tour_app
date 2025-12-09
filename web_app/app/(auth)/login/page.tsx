import Input from "../_components/Input";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen w-full justify-center md:justify-between items-center bg-theme-lightgray gap-5 px-12 py-6">
      <div className="flex-1  h-full flex flex-col gap-2 justify-center px-6 py-3 bg-theme-light rounded-md shadow-2xl/5">
        <Input
          label="Email"
          placeholder="Input your email here..."
          name="email"
        />
      </div>
      <div className="flex-1 bg-theme-dark-orange rounded-2xl h-full hidden md:block min-h-[80dvh]"></div>
    </div>
  );
};

export default LoginPage;
