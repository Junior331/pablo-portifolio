import { CheckIcon, DownloadIcon } from "lucide-react";

import { Layout } from "@/components/organism";
import { Button } from "@/components/elements/Button";
import curriculo from "../../assets/Lorem-Ipsum.pdf";
import { IconCloudDemo } from "@/components/ui/icon-cloud";
import { NumberTicker } from "@/components/ui/number-ticker";
import BoxReveal from "@/components/ui/box-reveal";
import BlurIn from "@/components/ui/blur-in";

export const Home = () => (
  <Layout>
    <div className="w-full h-full flex-1 flex flex-col justify-between items-center pb-6">
      <div className="flex mt-10 items-center justify-between w-full px-14 max-[1000px]:flex-wrap ">
        <div className="flex flex-col gap-14 w-full ">
          <BoxReveal boxColor={"#262626"} duration={0.5}>
            <h2 className="irish-grover-regular text-5xl leading-[55px]">
              Hi, I’m <br />
              PABLO MOUREIRA
            </h2>
          </BoxReveal>

          <div className="flex flex-col gap-3 max-w-[760px] ">
            <BoxReveal boxColor={"#262626"} duration={0.5}>
              <p className="inter capitalize text-lg font-extralight">
                Sou especialista backend e apaixonado por javascript.
                Normalmente, trabalho com aplicações node e suas tecnologias
                aliadas, a exemplo do Express, serviços AWS, MySQL, MongoDB,
                Docker e etc, das quais sou entusiasta. SA.
              </p>
            </BoxReveal>

            <BoxReveal boxColor={"#262626"} duration={0.5}>
              <p className="inter capitalize text-lg font-extralight">
                Hoje presto serviço para uma startup fintech, em uma grande
                empresa multinacional do setor de varejo, com foco em bank as
                service. Antes passei por algumas outras empresas e
                consultorias, aonde destacaria a TV Globo e as Lojas Americanas
                SA.
              </p>
            </BoxReveal>

            <BoxReveal boxColor={"#262626"} duration={0.5}>
              <p className="inter capitalize text-lg font-extralight">
                Fico à disposição para dúvidas e poder contribuir com soluções
                aos seus problemas.
              </p>
            </BoxReveal>

            <div className="z-10 flex mt-16 items-center justify-start">
              <BoxReveal boxColor={"#262626"} duration={0.5}>
                <Button
                  downloadStatus={false}
                  buttonColor="#000000"
                  buttonTextColor="#ffffff"
                  initialText={
                    <span className="group inline-flex items-center">
                      Baixe o meu curriculo
                      <DownloadIcon className="ml-2 size-4 transition-transform duration-300" />
                    </span>
                  }
                  changeText={
                    <span className="group inline-flex items-center">
                      <CheckIcon className="mr-2 size-4" />
                      Baixado
                    </span>
                  }
                  downloadFileUrl={curriculo}
                />
              </BoxReveal>
            </div>
          </div>
        </div>
        <div className="m-auto relative flex h-auto max-w-[530px] w-full flex-col items-center justify-center overflow-hidden background">
          <IconCloudDemo />
        </div>
      </div>
      <div className="flex max-[1000px]:flex-wrap-reverse gap-8 items-end justify-between bottom-8 w-screen px-8">
        <div className="flex gap-8">
          <a
            className="inter capitalize text-base cursor-pointer"
            href="https://www.linkedin.com/in/pablo-moreira-a18848165/"
            target="_blank"
          >
            <BlurIn
              word="Linkedin"
              className="inter capitalize text-base cursor-pointer"
            />
          </a>
          <BlurIn
            word="Github"
            className="inter capitalize text-base cursor-pointer"
          />
        </div>
        <div className="flex gap-12 items-center justify-between flex-1 max-w-[755px]">
          <div>
            <p className="text-3xl font-bold">
              + <NumberTicker value={7} />
            </p>
            <p className="inter text-lg">
              Anos de <br /> expêrincia
            </p>
          </div>
          <div>
            <p className="inter text-3xl font-bold">
              + <NumberTicker value={8} />
            </p>
            <p className="inter text-lg">
              Tecnologias <br /> Dominadas
            </p>
          </div>
          <div>
            <p className="inter text-3xl font-bold">
              + <NumberTicker value={656} />
            </p>
            <p className="inter text-lg">
              Commits em <br /> Projetos
            </p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
