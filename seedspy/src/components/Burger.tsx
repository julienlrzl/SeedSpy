import styled from "styled-components";

interface BurgerProps {
  isOpen: boolean;
  toggle: () => void;
}

const Burger = ({ isOpen, toggle }: BurgerProps) => {
  return (
    <StyledWrapper>
      <label className="burger">
        <input type="checkbox" checked={isOpen} onChange={toggle} />
        <span />
        <span />
        <span />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .burger {
    position: relative;
    width: 28px;
    height: 18px;
    background: transparent;
    cursor: pointer;
    display: block;
  }

  .burger input {
    display: none;
  }

  .burger span {
    display: block;
    position: absolute;
    height: 1.8px;
    width: 100%;
    background: #525252; /* Tailwind's neutral-600 */
    border-radius: 2px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }

  .burger span:nth-of-type(1) {
    top: 0px;
    transform-origin: left center;
  }

  .burger span:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
  }

  .burger span:nth-of-type(3) {
    top: 100%;
    transform: translateY(-100%);
    transform-origin: left center;
  }

  .burger input:checked ~ span:nth-of-type(1) {
    transform: rotate(45deg);
    top: 0px;
    left: 3px;
  }

  .burger input:checked ~ span:nth-of-type(2) {
    width: 0%;
    opacity: 0;
  }

  .burger input:checked ~ span:nth-of-type(3) {
    transform: rotate(-45deg);
    top: 20px;
    left: 3px;
  }
`;

export default Burger;
