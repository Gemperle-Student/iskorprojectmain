import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";

export const Frame = (): JSX.Element => {
  // Navigation items data
  const navItems = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#" },
    { label: "About", href: "#" },
  ];

  // Role selection cards data
  const roleCards = [
    {
      id: "student",
      title: "Student",
      imageSrc: "https://c.animaapp.com/hBohPunw/img/group@2x.png",
      imageAlt: "Student illustration",
    },
    {
      id: "teacher",
      title: "Teacher",
      imageSrc: "https://c.animaapp.com/hBohPunw/img/michel@2x.png",
      imageAlt: "Teacher illustration",
    },
  ];

  const handleNavClick = (label: string) => {
    console.log(`Clicked on ${label}`);
    // Add navigation logic here
  };

  const handleLogin = () => {
    console.log("Login clicked");
    // Add login logic here
  };

  const handleSignIn = () => {
    console.log("Sign in clicked");
    // Add sign in logic here
  };

  const handleRoleSelection = (role: string) => {
    console.log(`Selected role: ${role}`);
    // Add role selection logic here
  };

  return (
    <div className="flex justify-center w-full bg-white">
      <div className="w-full max-w-[1440px] min-h-screen bg-[#fefefe] rounded-[10px] relative overflow-hidden">
        {/* Header */}
        <header className="w-full h-[104px] bg-white border-b border-black flex items-center justify-between px-12">
          <div className="flex items-center">
            <img
              className="w-[126px] h-[42px]"
              alt="Logo"
              src="https://c.animaapp.com/hBohPunw/img/objects.svg"
            />
          </div>

          <div className="flex items-center space-x-12">
            <nav className="flex space-x-12">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="font-medium text-2xl text-black hover:bg-transparent hover:text-[#4646d2]"
                  onClick={() => handleNavClick(item.label)}
                >
                  {item.label}
                </Button>
              ))}
            </nav>

            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                className="font-medium text-2xl text-black hover:bg-transparent hover:text-[#4646d2]"
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                className="h-[42px] px-6 bg-[#4646d2] hover:bg-[#3d3dbe] rounded-[10px]"
                onClick={handleSignIn}
              >
                <span className="font-medium text-2xl">Sign in</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center mt-48">
          {/* Please Choose Button */}
          <Button
            className="w-[312px] h-[37px] mb-5 bg-[#4d4dd4] hover:bg-[#4343c0] rounded-[10px]"
            variant="default"
          >
            <span className="font-medium text-2xl text-white">
              Please Choose!
            </span>
          </Button>

          {/* Role Selection Cards */}
          <div className="flex items-center space-x-8 mt-5">
            <Card 
              className="w-[207px] h-[189px] bg-[#4d4dd4] rounded-[10px] border-none overflow-hidden cursor-pointer hover:bg-[#4343c0] transition-colors duration-200"
              onClick={() => handleRoleSelection("Student")}
            >
              <CardContent className="flex flex-col items-center justify-between h-full p-0">
                <div className="flex items-center justify-center h-[133px] w-full">
                  <div className="relative w-[133px] h-[89px] mt-4">
                    <img
                      className="w-[133px]"
                      src="https://c.animaapp.com/hBohPunw/img/group@2x.png"
                      alt="Student illustration"
                    />
                    <img
                      className="absolute w-[130px] h-px bottom-0 left-0"
                      alt="Vector"
                      src="https://c.animaapp.com/hBohPunw/img/vector.svg"
                    />
                  </div>
                </div>
                <div className="font-medium text-white text-2xl pb-5">
                  Student
                </div>
              </CardContent>
            </Card>

            <Separator
              orientation="vertical"
              className="h-[165px] bg-black w-0.5 rounded-[10px]"
            />

            <Card 
              className="w-[207px] h-[189px] bg-[#4d4dd4] rounded-[10px] border-none overflow-hidden cursor-pointer hover:bg-[#4343c0] transition-colors duration-200"
              onClick={() => handleRoleSelection("Teacher")}
            >
              <CardContent className="flex flex-col items-center justify-between h-full p-0">
                <div className="flex items-center justify-center h-[133px] w-full">
                  <div className="relative w-[135px] h-[98px] mt-4">
                    <img
                      className="w-6 h-[82px]"
                      src="https://c.animaapp.com/hBohPunw/img/michel@2x.png"
                      alt="Teacher illustration"
                    />
                    <img
                      className="absolute w-[117px] h-px bottom-0 left-[18px]"
                      alt="Rectangle"
                      src="https://c.animaapp.com/hBohPunw/img/rectangle-125.svg"
                    />
                  </div>
                </div>
                <div className="font-medium text-white text-2xl pb-5">
                  Teacher
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};
