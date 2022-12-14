import { Component } from "react";
import client from "../../../GraphQL/apolloClient";
import getAllCurrencies from "../../../GraphQL/currency";
import { setCurrency } from "../../../redux/slices/currencySlice";
import styled from "styled-components";
import { ReactComponent as Icon } from "../../../assets/icons/arrow.svg";
import { connect } from "react-redux";

export class HeaderCurrencySwitcher extends Component {
  state = {
    currencies: [],
    currency: "",
    open: false,
  };

  fetchCurrencies = async () => {
    const res = await client.query({
      query: getAllCurrencies,
    });
    this.setState({ currencies: [...res.data.currencies] });
  };

  toggleSwitcher = () => {
    this.setState((state) => ({ open: !state.open }));
  };

  currencyItemClick = (event) => {
    console.log(event.target.firstChild.data);
    this.setState({ currency: event.target.firstChild.data });
    this.props.setCurrency(event.target.firstChild.data);
  };

  componentDidMount() {
    this.fetchCurrencies();
  }

  render() {
    const { currencies, open, currency } = this.state;
    console.log(this.props);
    return (
      <SwitcherContainer onClick={() => this.toggleSwitcher()}>
        <CurrencySymbol>
          {currency || this.props.currentCurrency}
        </CurrencySymbol>
        <CurrencyToggle open={open} />
        {open && (
          <>
            <ModalBackdrop open={open} />
            <CurrencyList>
              {currencies.map(({ label, symbol }, index) => (
                <CurrencyListItem key={index} onClick={this.currencyItemClick}>
                  {symbol} {label}
                </CurrencyListItem>
              ))}
            </CurrencyList>
          </>
        )}
      </SwitcherContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.currency.currentCurrency,
});

export default connect(mapStateToProps, { setCurrency })(
  HeaderCurrencySwitcher
);

//styling

const SwitcherContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 22px 0 auto;
  font-family: Raleway, sans-serif;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
`;

const CurrencySymbol = styled.div`
  padding: 0 10px;
`;

const CurrencyToggle = styled(Icon)`
  transform: ${({ open }) => (open ? "rotate(180deg)" : "")};
  stroke: black;
`;

const ModalBackdrop = styled.div`
	position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
	visibility: ${({ open }) => (open ? "" : "hidden")};
	cursor: default;
	}
`;

const CurrencyList = styled.ul`
  position: absolute;
  top: 100%;
  left: -12.5px;
  z-index: 2;
  background-color: #fff;
  width: 114px;
  margin-top: 7.5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  list-style-type: none;
`;

const CurrencyListItem = styled.li`
  width: 114px;
  height: 45px;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  line-height: 45px;
  &:hover {
    background-color: #eeeeee;
    cursor: pointer;
  }
`;
