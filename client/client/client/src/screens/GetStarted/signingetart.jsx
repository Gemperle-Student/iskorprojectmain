import React from "react";
import { Button } from "../../components/ui/button1";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

export const GetStarted = () => {
  // Navigation items data
  const navItems = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#" },
    { label: "About", href: "#" },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1440px] h-[1024px] relative">
        <div className="absolute w-[2135px] h-[2035px] top-[-1931px] left-0">
          <div className="absolute w-px h-[2002px] top-0 left-[674px] bg-[#d9d9d9]" />

          <header className="absolute w-[2135px] h-[104px] top-[1931px] left-0 bg-white border border-solid border-black">
            <div className="relative w-[1264px] h-[60px] top-[31px] left-[89px] flex items-center justify-between">
              <img
                className="w-[126px] h-[42px]"
                alt="Logo"
                src="https://c.animaapp.com/m8jlr9y541qSf3/img/objects.svg"
              />

              <div className="flex items-center justify-between w-[795px]">
                <nav className="flex space-x-[74px]">
                  {navItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="font-medium text-black text-2xl leading-[22px]"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <div className="flex items-center space-x-[46px]">
                  <a
                    href="#"
                    className="font-medium text-black text-2xl leading-[22px]"
                  >
                    Login
                  </a>
                  <Button className="w-[127px] h-[42px] bg-[#4646d2] rounded-[10px] text-2xl font-medium">
                    Sign in
                  </Button>
                </div>
              </div>
            </div>
          </header>
        </div>

        <Card className="absolute w-[732px] h-[705px] top-[198px] left-[353px] bg-white rounded-[40px] overflow-hidden border border-solid border-[#d9d9d9] shadow-[0px_4px_4px_#00000040]">
          <CardContent className="p-0">
            <div className="relative w-[645px] h-[556px] top-[69px] left-[33px]">
              <div className="relative h-[556px]">
                <div className="absolute w-[276px] h-[84px] top-0 left-[198px] flex flex-col items-center">
                  <h1 className="font-bold text-black text-5xl text-center tracking-[0] leading-[22px] whitespace-nowrap mb-10">
                    Get Started
                  </h1>
                  <p className="font-semibold text-[#00000059] text-xl text-center tracking-[0] leading-[22px] whitespace-nowrap">
                    Create your account now
                  </p>
                </div>

                <div className="absolute w-[645px] h-[439px] top-[117px] left-0">
                  <div className="absolute w-[645px] h-[317px] top-0 left-0">
                    <form className="w-full">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                        <div className="flex flex-col space-y-2">
                          <label className="font-normal text-black text-base">
                            Username
                          </label>
                          <Input className="h-[53px] bg-[#fefefe] rounded-[9px] border border-solid border-[#211d1d] shadow-[0px_4px_4px_#00000040]" />
                        </div>

                        <div className="flex flex-col space-y-2">
                          <label className="font-normal text-black text-base">
                            Email
                          </label>
                          <Input className="h-[53px] bg-[#fefefe] rounded-[9px] border border-solid border-[#211d1d] shadow-[0px_4px_4px_#00000040]" />
                        </div>

                        <div className="flex flex-col space-y-2">
                          <label className="font-normal text-black text-base">
                            Password
                          </label>
                          <Input
                            type="password"
                            className="h-[53px] bg-[#fefefe] rounded-[9px] border border-solid border-[#211d1d] shadow-[0px_4px_4px_#00000040]"
                          />
                        </div>

                        <div className="flex flex-col space-y-2">
                          <label className="font-normal text-black text-base">
                            Confirm Password
                          </label>
                          <Input
                            type="password"
                            className="h-[53px] bg-[#fefefe] rounded-[9px] border border-solid border-[#211d1d] shadow-[0px_4px_4px_#00000040]"
                          />
                        </div>
                      </div>

                      <Button className="w-[326px] h-[54px] mt-8 mx-auto block bg-[#4d4dd4] rounded-[10px] border border-solid border-black font-bold text-white text-base">
                        Sign in
                      </Button>
                    </form>

                    <div className="absolute w-[303px] h-4 top-[301px] left-[181px] flex items-center justify-center">
                      <Separator className="w-[88px] h-0.5 bg-[#0f0e0e78] rounded-[5px]" />
                      <span className="mx-6 font-semibold text-[#211d1df5] text-sm">
                        or
                      </span>
                      <Separator className="w-[88px] h-0.5 bg-[#0f0e0e78] rounded-[5px]" />
                    </div>
                  </div>

                  <div className="absolute w-[401px] h-[82px] top-[357px] left-40">
                    <Button
                      variant="outline"
                      className="w-[326px] h-[50px] bg-[#fefefe] rounded-[9px] border border-solid border-[#211d1d] shadow-[0px_4px_4px_#00000040] flex items-center justify-center"
                    >
                      <img
                        className="w-[22px] h-[21px] mr-2.5"
                        alt="Google logo"
                        src="https://c.animaapp.com/m8jlr9y541qSf3/img/image.png"
                      />
                      <span className="font-normal text-black text-base">
                        Sign in with Google
                      </span>
                    </Button>

                    <div className="absolute w-[405px] h-[15px] top-[67px] left-0 text-center">
                      <span className="font-normal text-black text-base">
                        Already have an account?{" "}
                      </span>
                      <a
                        href="#"
                        className="font-bold text-[#006d77] text-base"
                      >
                        Login
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
