import {
    ActivityIcon,
    BarChartBigIcon,
    FacebookIcon,
    GithubIcon,
    InstagramIcon,
    LineChartIcon,
    LinkedinIcon,
    PieChartIcon,
  } from "lucide-react";
  import React from "react";
  import { Button } from "../../components/ui/button1";
  import { Card, CardContent } from "../../components/ui/card";
  import { Separator } from "../../components/ui/separator";
  
  const Landingpage = () => {
    // Navigation links data
    const navLinks = [
      { title: "Home", href: "#" },
      { title: "Features", href: "#features" },
      { title: "About", href: "#about" },
    ];
  
    // Feature cards data
    const featureCards = [
      {
        icon: <LineChartIcon className="w-7 h-7" />,
        title: "Real-Time Progress Tracking",
        description:
          "Monitor student performance as it happens with instant updates and notifications.",
      },
      {
        icon: <PieChartIcon className="w-7 h-7" />,
        title: "Comprehensive Analytics",
        description:
          "Gain insights through detailed reports and visual data representations.",
      },
      {
        icon: <BarChartBigIcon className="w-7 h-7" />,
        title: "Performance Metrics",
        description:
          "Track key performance indicators and identify areas of improvement.",
      },
      {
        icon: <ActivityIcon className="w-7 h-7" />,
        title: "Activity Monitoring",
        description:
          "Keep track of student engagement and participation in real-time.",
      },
    ];
  
    // Footer links data
    const footerLinks = {
      about: [
        { title: "About", href: "#about" },
        { title: "Features", href: "#features" },
        { title: "Home", href: "#" },
      ],
      legal: [
        { title: "Legal", href: "#" },
        { title: "Privacy Policy", href: "#" },
        { title: "Terms of service", href: "#" },
      ],
    };
  
    // Social media links
    const socialLinks = [
      { icon: <FacebookIcon className="w-6 h-6" />, href: "#" },
      { icon: <GithubIcon className="w-6 h-6" />, href: "#" },
      { icon: <InstagramIcon className="w-6 h-6" />, href: "#" },
      { icon: <LinkedinIcon className="w-6 h-6" />, href: "#" },
    ];
  
    return (
      <div className="bg-white flex flex-col justify-center w-full">
        <div className="bg-white overflow-hidden w-full max-w-[1440px] relative mx-auto">
          {/* Hero Section */}
          <section className="relative w-full">
            <header className="w-full bg-white sticky top-0 z-10">
              <div className="max-w-[1264px] mx-auto py-[26px] flex items-center justify-between">
                <img
                  className="w-[126px] h-[42px]"
                  alt="Iskor Logo"
                  src="https://c.animaapp.com/m8jl5xp7VAdhAz/img/objects.svg"
                />
  
                <div className="flex items-center gap-8">
                  <nav className="flex gap-12">
                    {navLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="font-medium text-2xl leading-[22px] text-black"
                      >
                        {link.title}
                      </a>
                    ))}
                  </nav>
  
                  <div className="flex items-center gap-6">
                    <a
                      href="#login"
                      className="font-medium text-2xl leading-[22px] text-black"
                    >
                      Login
                    </a>
                    <Button className="w-[127px] h-[42px] bg-[#4646d2] rounded-[10px] text-2xl font-medium">
                      Sign in
                    </Button>
                  </div>
                </div>
              </div>
              <Separator className="w-full h-px bg-black" />
            </header>
  
            <div className="flex justify-between items-center px-20 pt-[225px] pb-20">
              <div className="max-w-[618px]">
                <h1 className="font-bold text-[#4646d2] text-[64px] leading-[80px]">
                  Track <br />
                  Your Score.
                </h1>
  
                <p className="mt-8 text-2xl leading-[22px] text-[#00000099] max-w-[611px]">
                  Iskor is a web-based application that allows students to
                  monitor, analyze, and manage their academic scores and
                  performance. It serves as a centralized platform where students
                  can track, and review their grades, test scores, and other
                  academic metrics.
                </p>
  
                <div className="flex gap-6 mt-12">
                  <Button className="w-56 h-[67px] bg-[#4646d2] rounded-[10px] text-2xl font-medium">
                    Join now
                  </Button>
                  <Button
                    variant="outline"
                    className="w-56 h-[67px] border-[#0000006b] rounded-[10px] text-2xl font-medium text-black"
                  >
                    Learn more
                  </Button>
                </div>
              </div>
  
              <img
                className="w-[611px] h-[405px] object-cover"
                alt="Iskor Dashboard Screenshot"
                src="https://c.animaapp.com/m8jl5xp7VAdhAz/img/screenshot-2025-03-16-100400-1.png"
              />
            </div>
          </section>
  
          {/* Features Section */}
          <section id="features" className="w-full bg-white py-20">
            <div className="text-center max-w-[800px] mx-auto mb-8">
              <h2 className="font-bold text-[#4646d2] text-[48px] mb-4">
                Powerful Features
              </h2>
              <p className="text-[#333333] text-xl">
                Everything you need to track and improve student performance
              </p>
            </div>

            <div className="flex justify-center items-center gap-4 mt-12 px-8 max-w-[1200px] mx-auto flex-wrap md:flex-nowrap">
              <div className="w-[270px] bg-white border border-[#e2e8f0] rounded-lg p-6 shadow-sm">
                <div className="text-[#4646d2] mb-3">
                  <LineChartIcon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-[#1e293b] text-lg mb-2">
                  Real-Time Progress Tracking
                </h3>
                <p className="text-[#64748b] text-sm">
                  Monitor student performance as it happens with instant updates and notifications.
                </p>
              </div>
              
              <div className="w-[270px] bg-white border border-[#e2e8f0] rounded-lg p-6 shadow-sm">
                <div className="text-[#4646d2] mb-3">
                  <PieChartIcon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-[#1e293b] text-lg mb-2">
                  Comprehensive Analytics
                </h3>
                <p className="text-[#64748b] text-sm">
                  Gain insights through detailed reports and visual data representations.
                </p>
              </div>
              
              <div className="w-[270px] bg-white border border-[#e2e8f0] rounded-lg p-6 shadow-sm">
                <div className="text-[#4646d2] mb-3">
                  <BarChartBigIcon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-[#1e293b] text-lg mb-2">
                  Performance Metrics
                </h3>
                <p className="text-[#64748b] text-sm">
                  Track key performance indicators and identify areas of improvement.
                </p>
              </div>
              
              <div className="w-[270px] bg-white border border-[#e2e8f0] rounded-lg p-6 shadow-sm">
                <div className="text-[#4646d2] mb-3">
                  <ActivityIcon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-[#1e293b] text-lg mb-2">
                  Activity Monitoring
                </h3>
                <p className="text-[#64748b] text-sm">
                  Keep track of student engagement and participation in real-time.
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-16 px-6">
              <img
                className="w-full max-w-[1097px] rounded-lg shadow-md object-cover"
                alt="Iskor Dashboard Interface"
                src="https://c.animaapp.com/m8jl5xp7VAdhAz/img/2-25.png"
              />
            </div>
          </section>
  
          <Separator className="w-full h-px bg-black" />
  
          {/* About Section */}
          <section id="about" className="w-full bg-[#fefefe] py-20">
            <div className="flex justify-between items-center px-20">
              <div
                className="w-[593px] h-[539px] rounded-[10px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://c.animaapp.com/m8jl5xp7VAdhAz/img/3-1.png)",
                }}
              />
  
              <div className="max-w-[676px]">
                <div className="mb-12">
                  <h2 className="font-bold text-[#4646d2] text-[40px] leading-[22px]">
                    About Iskor
                  </h2>
                  <p className="mt-8 text-xl leading-[25px] text-[#000000cc] max-w-[594px]">
                    We're dedicated to transforming education through technology.
                    Our platform helps educators make data-driven decisions while
                    saving time on administrative tasks.
                  </p>
                </div>
  
                <div className="flex gap-5">
                  <div className="max-w-[321px]">
                    <h3 className="font-bold text-[#4646d2] text-3xl leading-[22px]">
                      Our Mission
                    </h3>
                    <p className="mt-6 text-xl leading-[25px] text-[#000000cc]">
                      To empower educators with tools that enhance student
                      learning outcomes.
                    </p>
                  </div>
  
                  <div className="max-w-[339px]">
                    <h3 className="font-bold text-[#4646d2] text-3xl leading-[22px]">
                      Our Vision
                    </h3>
                    <p className="mt-6 text-xl leading-[25px] text-[#000000cc]">
                      Creating a future where every student reaches their full
                      potential.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
  
          <Separator className="w-full h-px bg-black" />
  
          {/* Footer */}
          <footer className="w-full bg-white">
            <div className="max-w-[1440px] mx-auto">
              <div className="max-w-[1264px] mx-auto py-14">
                <div className="flex justify-between">
                  <div>
                    {footerLinks.about.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="block font-normal text-black text-xl leading-[25px] mb-4"
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>
  
                  <div>
                    {footerLinks.legal.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="block font-normal text-black text-xl leading-[25px] mb-4"
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>
  
                  <div>
                    <p className="font-normal text-black text-xl leading-[25px] mb-4">
                      Follow us
                    </p>
                    <div className="flex gap-4">
                      {socialLinks.map((social, index) => (
                        <a key={index} href={social.href} className="text-black hover:text-[#4646d2]">
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
  
              <Separator className="w-full h-px bg-black" />
            </div>
            <div className="bg-[#eceff2] w-full">
              <div className="max-w-[1440px] mx-auto">
                <div className="max-w-[1264px] mx-auto py-10 text-center">
                  <p className="font-normal text-black text-xl leading-[25px]">
                    © 2025 Iskor. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  };
  
  export default Landingpage;
  