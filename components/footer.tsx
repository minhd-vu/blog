import Container from "./container";
import { GITHUB_REPO } from "../lib/constants";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-6 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Minhimum Effort
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href={GITHUB_REPO}
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              View on GitHub
            </a>
            <span className="mx-3 font-bold">
              Copyright &copy; 2023 Minh Vu. All rights reserved.
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
