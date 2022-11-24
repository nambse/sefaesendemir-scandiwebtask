import {Component} from "react";
import HeaderNavigation from "./HeaderNavigation";
import styled from "styled-components"
import {Link} from "react-router-dom";
import {ReactComponent as Logo} from "../../../assets/icons/logo.svg";
import HeaderCurrencySwitcher from "./HeaderCurrencySwitcher";

class Header extends Component {

    render() {

        return (
            <HeaderContainer>
                    <HeaderNavigation />
                    <HeaderLogo><Logo /></HeaderLogo>
                    <HeaderCurrencySwitcher />
            </HeaderContainer>
        )
    }
}

export default Header;

// Styling

const HeaderContainer = styled.header`
    position: fixed;
	width: 100%;
	max-width: 1440px;
	padding: 0 calc(101 / 1440 * 100vw);
	margin-left: calc(101 / 1440 * -100vw);
	height: 80px;
	display: flex;
	align-items: center;
	background-color: white;
	z-index: 111;
`;


const HeaderLogo = styled(Link)`
  position: absolute;
  top: 29.41px;
  left: 50%;
  transform: translate(-50%, 0);

  @media (max-width: 485px) {
    left: 230px;
  }

  @media (max-width: 380px) {
    display: none;
  }
`