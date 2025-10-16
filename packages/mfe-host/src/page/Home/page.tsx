import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  PlusIcon,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { Button } from "../../components/button";
import { Calendar } from "../../components/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/dialog";
import { Fieldset } from "../../components/fieldset";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/popover";
import { data, plantoes } from "./data.mock";

type CalendarAttemptProps = { index: number };

const CalendarAttempt = ({ index }: CalendarAttemptProps) => {
  return (
    <div className="flex gap-3 p-2 rounded-lg shadow-md bg-[#262626]/70 text-white">
      {/* Barra */}
      <div className="w-1.5 bg-black rounded-md"></div>
      <div className="flex flex-col gap-2">
        <div className="font-bold text-sm">Team Sync Meeting</div>
        <div className="font-light text-xs">
          Jun 12, 9:00 - 19:00 - Dr. Mario - Index: {index}
        </div>
      </div>
    </div>
  );
};

const generateColor = (index) => {
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#8dd1e1",
    "#d084d0",
  ];
  return colors[index % colors.length];
};

const Home = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [attemptsPage, setAttemptsPage] = useState(0);
  const attempts = Array.from({ length: 20 }).map((_, index) => (
    <CalendarAttempt key={index} index={index} />
  ));
  const [open, setOpen] = useState(false);

  const ATTEMPTS_PER_PAGE = 5;

  const prevPage = () => {
    setAttemptsPage((prev) => Math.max(prev - 1, 0));
  };

  const nextPage = () => {
    const totalPages = attempts.length / ATTEMPTS_PER_PAGE;
    setAttemptsPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <div className="bg-[#f8f9fd]">
      {/*Header*/}
      <div className="px-4 pt-6 flex flex-col">
        <div className="text-lg font-medium text-black">
          Welcome back to VetCare!
        </div>
        <div className="flex justify-between items-center">
          <div className="text-md font-normal text-gray-400">
            Friday, October 25, 2024
          </div>
          <div className="flex gap-3">
            <Button variant={"outline"} className="h-8">
              <DownloadIcon />
              Export
            </Button>
            <Button variant={"default"} className="h-8">
              <PlusIcon />
              Add New Patient
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 auto-rows-max gap-3 p-3 overflow-y-auto">
        {/*First Line*/}
        <div
          className={
            "col-span-3 row-span-1 bg-white rounded-sm border border-gray-300 flex flex-col gap-2 p-2"
          }
        >
          <div className="text-sm text-black">Total Patient</div>
          <div className="text-xl text-black">1,250</div>
          <div className="flex text-gray-300 gap-1">
            <div>3.1%</div>
            <div>Last month</div>
          </div>
        </div>

        {/*End of the first line*/}

        <div className="col-span-4 bg-white rounded-xl h-96">
          <div className="flex justify-between">
            <div className="col-span-8 row-span-2 text-lg font-bold bg-white rounded-xl p-3">
              Atendimentos
            </div>
            <div className="col-span-8 row-span-2 text-sm text-gray-400/60 rounded-xl p-3">
              Realizados no mês
            </div>
          </div>
          <ResponsiveContainer width={"100%"} height={"80%"} className={"px-6"}>
            <PieChart>
              <Pie
                data={data}
                dataKey="atendimentos"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={generateColor(index)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-4 bg-white rounded-xl h-96">
          <div className="flex justify-between">
            <div className="col-span-8 row-span-2 text-lg font-bold bg-white rounded-xl p-3">
              Plantões
            </div>
            <div className="col-span-8 row-span-2 text-sm text-gray-400/60 rounded-xl p-3">
              Horas trabalhadas
            </div>
          </div>
          <ResponsiveContainer width={"100%"} height={"80%"} className={"px-6"}>
            <BarChart data={plantoes} barSize={30}>
              <XAxis dataKey="name" className="text-sm" />
              <Tooltip />
              <Bar dataKey="value" fill="#8834d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Calendar */}
        <div className="col-span-8 flex flex-col p-3 rounded-xl bg-white">
          <div className="mb-3 flex justify-between items-center">
            <div className="col-span-8 row-span-2 text-lg font-bold bg-white rounded-xl p-3">
              Procedimentos agendados
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"default"}>Agendar</Button>
                </DialogTrigger>
                <DialogContent className="w-full bg-white">
                  <DialogHeader>
                    <DialogTitle>Agendar procedimento</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    <Fieldset>
                      <Label htmlFor="pacient-name">Nome do Paciente</Label>
                      <Input
                        placeholder="Nome do paciente"
                        id="pacient-name"
                        name="pacient-name"
                      />
                    </Fieldset>

                    <Fieldset>
                      <Label htmlFor="owner-name">Nome do Tutor</Label>
                      <Input
                        placeholder="Nome do Tutor"
                        id="owner-name"
                        name="owner-name"
                      />
                    </Fieldset>

                    <Fieldset>
                      <Label htmlFor="owner-cpf">CPF</Label>
                      <Input
                        placeholder="CPF"
                        id="owner-cpf"
                        name="owner-cpf"
                      />
                    </Fieldset>

                    <Fieldset>
                      <Label htmlFor="owner-phone">Telefone</Label>
                      <Input
                        placeholder="Telefone"
                        id="owner-phone"
                        name="owner-phone"
                      />
                    </Fieldset>

                    <div className="flex gap-4">
                      <Fieldset className="w-full">
                        <Label htmlFor="date-picker">Data do atendimento</Label>
                        <Popover open={open} onOpenChange={setOpen} modal>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="date-picker"
                              className="w-full font-normal justify-between"
                            >
                              {date ? date.toLocaleDateString() : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0 bg-white"
                            align="start"
                            side="bottom"
                          >
                            <Calendar
                              mode="single"
                              selected={date}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                setDate(date);
                                setOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </Fieldset>

                      <Fieldset className="w-full">
                        <Label htmlFor="procedure-time">
                          Horário do atendimento
                        </Label>
                        <Input
                          placeholder="Horário do atendimento"
                          id="procedure-time"
                          name="procedure-time"
                          type="time"
                          step="1"
                          defaultValue="10:30:00"
                          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                      </Fieldset>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant={"outline"}>Cancelar</Button>
                    <Button variant={"default"}>Confirmar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex size-full justify-between overflow-y-hidden">
            <div className="size-full">
              <Calendar
                className="w-full"
                classNames={{ day_button: "size-8 " }}
                onSelect={setDate}
                selected={date}
                mode="single"
                locale={ptBR}
              />
            </div>
            <div className="size-full flex flex-col gap-2">
              {date && (
                <>
                  <div className="flex justify-between mb-2">
                    {format(date?.toString(), "PPP", { locale: ptBR })}
                    <div className="flex gap-2">
                      <ChevronLeftIcon onClick={prevPage} />
                      <ChevronRightIcon onClick={nextPage} />
                    </div>
                  </div>
                  {attempts.slice(
                    attemptsPage * ATTEMPTS_PER_PAGE,
                    (attemptsPage + 1) * ATTEMPTS_PER_PAGE,
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
