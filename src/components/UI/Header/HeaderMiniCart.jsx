import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as svg } from "../../../assets/icons/cart.svg";
import styled from "styled-components";
import CartProduct from "../../Product/Product";

class HeaderMiniCart extends Component {
  state = { dropdown: false, products: [] };

  toggleDropdown() {
    this.setState((state) => ({ dropdown: !state.dropdown }));
    console.log(this.props);
  }

  render() {
    const { currentCurrency, products } = this.props;
    console.log(products);
    const { dropdown } = this.state;

    const totalAmount = products.reduce((total, product) => {
      product.prices.forEach(({ currency, amount }) => {
        if (currency.symbol === currentCurrency) {
          total = total + amount * product.quantity;
        }
      });
      return total;
    }, 0);

    const totalProducts = products.reduce((total, product) => {
      return total + product.quantity;
    }, 0);

    return (
      <HeaderMiniCartContainer onClick={() => this.toggleDropdown()}>
        <MiniCartSvg />
        <MiniCartCounter>{totalProducts}</MiniCartCounter>
        {dropdown && (
          <>
            <MiniCartBackDrop dropdown={dropdown} />
            <MiniCartDropdown onClick={() => this.toggleDropdown()}>
              <MiniCartDropdownProducts>
                <MiniCartWelcome>
                  My Bag,
                  <MiniCartTotalItems>
                    {` ${totalProducts} items`}
                  </MiniCartTotalItems>
                </MiniCartWelcome>
                <MiniCartProducts>
                  {products.map(
                    (
                      {
                        id,
                        brand,
                        name,
                        prices,
                        attributes,
                        currentAttributes,
                        gallery,
                        quantity,
                      },
                      index
                    ) => (
                      <CartProduct
                        key={index}
                        id={id}
                        brand={brand}
                        name={name}
                        currentCurrency={currentCurrency}
                        prices={prices}
                        attributes={attributes}
                        currentAttributes={currentAttributes}
                        gallery={gallery}
                        quantity={quantity}
                      ></CartProduct>
                    )
                  )}
                </MiniCartProducts>
                <MiniCartTotal>
                  Total
                  <MiniCartTotalPrice>
                    {currentCurrency}
                    {totalAmount.toFixed(2)}
                  </MiniCartTotalPrice>
                </MiniCartTotal>
              </MiniCartDropdownProducts>
              <MiniCartButtons>
                <MiniCartViewBag
                  to={`/cart`}
                  onClick={() => this.toggleDropdown()}
                >
                  VIEW BAG
                </MiniCartViewBag>
                <MiniCartCheckOut>CHECK OUT</MiniCartCheckOut>
              </MiniCartButtons>
            </MiniCartDropdown>
          </>
        )}
      </HeaderMiniCartContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.currency.currentCurrency,
  products: state.cart.products,
});

export default connect(mapStateToProps)(HeaderMiniCart);

//styling

const HeaderMiniCartContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const MiniCartSvg = styled(svg)`
  cursor: pointer;
`;

const MiniCartCounter = styled.p`
  position: absolute;
  bottom: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  background-color: #000;
`;

const MiniCartDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: -25px;
  z-index: 1;
  background-color: #fff;
  width: 325px;
  height: 677px;
  margin-top: 29px;
  padding: 32px 16px;
  cursor: default;
`;

const MiniCartDropdownProducts = styled.div`
  width: 293px;
  height: 538px;
  margin-bottom: 32px;
`;

const MiniCartWelcome = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: bold;
  font-size: 16px;
  line-height: 160%;
  margin-bottom: 32px;
`;

const MiniCartTotalItems = styled.p`
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  margin-bottom: 32px;
`;

const MiniCartProducts = styled.ul`
  margin-bottom: 32px;
  width: 293px;
  height: 420px;
  contain: content;
  display: block;
  list-style-type: none;
  overflow-y: auto;
  overflow-x: hidden;
  //hide scrollbar on firefox.
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MiniCartTotal = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Raleway", sans-serif;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
`;

const MiniCartTotalPrice = styled.span`
  font-weight: bold;
  line-height: 160%;
`;

const MiniCartButtons = styled.div`
  display: flex;
  width: 292px;
  height: 43px;
  font-weight: 600;
`;

const MiniCartViewBag = styled(Link)`
  display: block;
  margin-right: 12px;
  width: 140px;
  height: 43px;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  line-height: 43px;
  border: 1px solid var(--main-text-color);
  background-color: white;
  cursor: pointer;
`;

const MiniCartCheckOut = styled.button`
  width: 140px;
  height: 43px;
  font-weight: 600;
  font-size: 14px;
  line-height: 16.8px;
  color: white;
  background-color: var(--accent-color);
  border: none;
  cursor: pointer;
`;

const MiniCartBackDrop = styled.div`
	position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
	margin-top: 80px;
	background: rgba(57, 55, 72, 0.22);
	visibility: ${({ dropdown }) => (dropdown ? "" : "hidden")};
	cursor: default;
	z-index: 1;
	}
`;
