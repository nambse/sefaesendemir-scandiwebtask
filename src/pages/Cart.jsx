import { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Product from "../components/Product/Product";
import withRouter from "../components/HOC/withRouter";

class Cart extends Component {
  render() {
    const { currentCurrency, products } = this.props;

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
      <CartContainer>
        <CartHeader>CART</CartHeader>
        {products.length > 0 ? (
          <>
            <CartProducts>
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
                  <Product
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
                    origin={"page"}
                  ></Product>
                )
              )}
            </CartProducts>
            <CartTaxQuantity>
              Tax 21%:{" "}
              <CartTaxQuantityValue>
                {currentCurrency}
                {(totalAmount * 0.21).toFixed(2)}
              </CartTaxQuantityValue>
            </CartTaxQuantity>
            <CartTaxQuantity>
              Quantity:{" "}
              <CartTaxQuantityValue>{totalProducts}</CartTaxQuantityValue>
            </CartTaxQuantity>
            <CartTotal>
              Total:&ensp;&ensp;&ensp;&ensp;
              <CartTaxQuantityValue>
                {currentCurrency}
                {totalAmount.toFixed(2)}
              </CartTaxQuantityValue>
            </CartTotal>
            <CartOrder>ORDER</CartOrder>
          </>
        ) : (
          <CartEmpty onClick={() => this.props.router.navigate("/")}>
            Your cart is empty, click here to go back shopping.
          </CartEmpty>
        )}
      </CartContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.currency.currentCurrency,
  products: state.cart.products,
});

export default connect(mapStateToProps)(withRouter(Cart));

//styling

const CartContainer = styled.section`
  padding-top: 80px;
`;

const CartHeader = styled.h2`
  padding-top: 80px;
  margin-bottom: 55px;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;

  @media (max-width: 1024px) {
    font-size: calc(32 / 1024 * 100vw);
    padding-top: calc(80 / 1024 * 100vw);
    margin-bottom: calc(55 / 1024 * 100vw);
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const CartProducts = styled.ul`
  margin-bottom: 32px;
  list-style-type: none;
`;

const CartTaxQuantity = styled.p`
  margin-bottom: 8px;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;

  @media (max-width: 1024px) {
    font-size: calc(24 / 1024 * 100vw);
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CartTotal = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;

  @media (max-width: 1024px) {
    font-size: calc(24 / 1024 * 100vw);
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CartTaxQuantityValue = styled.span`
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;

  @media (max-width: 1024px) {
    font-size: calc(24 / 1024 * 100vw);
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CartOrder = styled.button`
  margin: 16px 0;
  width: 279px;
  height: 43px;
  font-weight: 600;
  font-size: 14px;
  line-height: 120%;
  color: white;
  background-color: var(--accent-color);
  border: none;
  cursor: pointer;
`;

const CartEmpty = styled.h1`
  cursor: pointer;
`;
