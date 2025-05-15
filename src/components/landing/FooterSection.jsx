import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const FooterSection = () => {
  return (
    <footer className="w-full bg-[#111820] text-white py-16">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img
                className="w-[33px] h-[42px] object-cover"
                alt="Logo"
                src="../../src/components/imges/logo-removebg-preview-1-1.png"
              />
              <span className="font-semibold text-xl">ROFEO Academy</span>
            </div>
            <p className="text-[#ffffffcc] text-sm leading-[30px]">
              ROFEO Academy est spécialisée dans les formations pour enfants en robotique, programmation et intelligence artificielle.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-base mb-6">Company</h3>
            <ul className="space-y-3">
              <li className="text-[#ffffffcc] text-sm">Home</li>
              <li className="text-[#ffffffcc] text-sm">About us</li>
              <li className="text-[#ffffffcc] text-sm">Contact us</li>
              <li className="text-[#ffffffcc] text-sm">Privacy policy</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-base mb-6">
              Subscribe to our newsletter
            </h3>
            <p className="text-[#ffffffcc] text-sm leading-[22px] mb-6">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
            <div className="flex">
              <Input
                className="bg-gray-800 border-[#6b72804c] text-gray-500 rounded-r-none h-[38px]"
                placeholder="Enter your email"
              />
              <Button className="bg-primary rounded-l-none h-[38px]">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20 my-6" />

        <div className="text-center">
          <p className="text-[#ffffff99] text-[15px]">
            Copyright 2025 © rofeo. All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}; 