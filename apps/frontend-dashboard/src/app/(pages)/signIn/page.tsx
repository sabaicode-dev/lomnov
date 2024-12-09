import Login from '@/components/atoms/login'; // Ensure you import using PascalCase and correct file path

const page = () => {
  return (
    <div>
      <h1>This first page that user need to login before !</h1>
      <Login /> {/* Use PascalCase here */}
    </div>
  );
};

export default page;
