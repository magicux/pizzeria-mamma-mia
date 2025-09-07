import hero from "../assets/imgs/Header.jpg";

const Header = () => {
  return (
    <header
      className="hero"
      style={{ backgroundImage: `url(${hero})` }}
      aria-label="Hero"
    >
      <div className="hero__center">
        <div className="hero__card">
          <h1 className="hero__title mb-2">¡Pizzería Mamma Mía!</h1>
          <p className="hero__subtitle mb-0">
            Las mejores pizzas, ingredientes frescos y mucho sabor. <br />
            ¡Elige tu favorita y disfrútala!
          </p>
        </div>
      </div>
      <div className="hero__fade" />
    </header>
  );
};

export default Header;
