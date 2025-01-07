import { Button, Input } from "@/components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault(); // Evita o comportamento padrão, como a navegação
    navigate("/register");
  };

  return (
    <div className="size-full flex justify-center items-center bg-white">
      <div className="flex flex-col gap-4 size-full sm:size-1/2 sm:max-w-[300px] sm:max-h-[300px] text-sm">
        {/* <div className="flex justify-center text-4xl">LOGO</div> */}
        <div className="text-2xl font-medium text-text-900/40">
          Faça login na sua conta do XYZ
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold">E-mail</label>
          <Input id="email" placeholder="Insira seu endereço de e-mail..." />
          {!showPassword && (
            <div className="text-xs text-text-900/80 font-light">
              Insira seu e-mail previamente cadastrado para acessar ao sistema
            </div>
          )}
        </div>
        {showPassword && (
          <>
            <div className="flex flex-col gap-1">
              <label htmlFor="input-password" className="text-xs font-semibold">
                Password
              </label>
              <Input id="input-password" placeholder="Insira sua senha..." />
            </div>
            <div className="text-[10px] text-blue-900 font-semibold">
              Não lembra sua senha?{" "}
              <Link to="/recovery-password" className="">
                Recuperar senha
              </Link>
            </div>
          </>
        )}
        <Button
          onClick={() => {
            setShowPassword(true);
          }}
        >
          {showPassword ? "Acessar" : "Continuar"}
        </Button>
        {!showPassword && (
          <div className="text-[10px] text-blue-900 font-semibold">
            Não possui uma conta?{" "}
            <a href="" onClick={handleClick} className="text-text-600">
              Registrar-se
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
