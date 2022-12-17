import { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { ReactComponent as ProductAddToCartIcon } from "../../assets/icons/addtocart.svg";
import withRouter from "../HOC/withRouter";
import ProductAttributes from "./ProductAttributes";

class ProductCard extends Component {
  state = {
    currentAttributes: [],
    productAttributesVisible: false,
    productVisible: true,
  };

  componentDidMount() {
    this.defaultCurrentAttributes();
  }

  defaultCurrentAttributes = () => {
    const currentAttributes = this.props.inStock
      ? this.props.attributes.reduce((currentAttributes, { name, items }) => {
          currentAttributes.push({ [name]: items[0].value });
          return currentAttributes;
        }, [])
      : [];

    this.setState({
      currentAttributes: currentAttributes,
    });
  };

  toggleProductAttributes = () => {
    if (this.props.attributes.length > 0) {
      this.setState({
        productAttributesVisible: !this.state.productAttributesVisible,
      });
      this.setState({
        productVisible: false,
      });
    }
    console.log("yaptım");
  };

  handleAttributeClick = (name, value) => {
    const currentAttributes = [...this.state.currentAttributes];
    currentAttributes?.some(
      (currentAttribute) => Object.keys(currentAttribute)[0] === name
    )
      ? currentAttributes.forEach((currentAttribute, index) => {
          Object.keys(currentAttribute)[0] === name &&
          currentAttribute[name] === value
            ? currentAttributes.splice(index, 1)
            : Object.keys(currentAttributes[index])[0] === name &&
              currentAttributes.splice(index, 1, {
                ...currentAttributes[index],
                [name]: value,
              });
        })
      : currentAttributes.push({ [name]: value });

    this.setState({ currentAttributes: currentAttributes });
  };

  handleMouseLeave = () => {
    this.setState({ productAttributesVisible: false });
    this.setState({ productVisible: true });
  };

  navigateToProduct = (event, id) => {
    if (
      event.target.localName !== "li" &&
      event.target.localName !== "button" &&
      // It is circle and path because event target localName sends the name of the svg element.
      event.target.localName !== "circle" &&
      event.target.localName !== "path"
    ) {
      this.props.router.navigate(`/product/${id}`);
    }
  };

  render() {
    const {
      id,
      gallery,
      brand,
      name,
      prices,
      inStock,
      currentCurrency,
      attributes,
    } = this.props;
    const currentProducts = [...this.props.products];

    const currencyPrice = prices.reduce(
      (currencyPrice, { currency, amount }) => {
        if (currency?.symbol === currentCurrency) {
          currencyPrice = amount;
        }
        return currencyPrice;
      },
      ""
    );
    const { currentAttributes } = this.state;

    return (
      <ProductCardItem inStock={inStock} onMouseLeave={this.handleMouseLeave}>
        <ProductCardLink onClick={(event) => this.navigateToProduct(event, id)}>
          {this.state.productVisible ? (
            <ProductCardImage src={gallery[0]} alt={name} />
          ) : null}
          {inStock ? (
            <ProductCardThumbnail>
              <ProductOrder>
                {this.state.productVisible && attributes.length > 0 ? (
                  <ProductAddToCartButton
                    inStock={inStock}
                    onClick={this.toggleProductAttributes}
                  >
                    <ProductAddToCartIcon />
                  </ProductAddToCartButton>
                ) : this.state.productVisible && !attributes.length > 0 ? (
                  <ProductAddToCartButton
                    inStock={inStock}
                    onClick={() =>
                      inStock &&
                      this.props.addToCart({
                        id,
                        gallery,
                        brand,
                        name,
                        prices,
                        attributes,
                        currentAttributes,
                        currentProducts,
                      })
                    }
                  >
                    <ProductAddToCartIcon />
                  </ProductAddToCartButton>
                ) : (
                  ""
                )}
              </ProductOrder>
              {this.state.productAttributesVisible && attributes.length > 0 ? (
                <ProductAttributesContainer>
                  <ProductAttributes
                    name={name}
                    brand={brand}
                    currency={currentCurrency}
                    price={currencyPrice}
                    attributes={attributes}
                    currentAttributes={currentAttributes}
                    handleAttributeClick={this.handleAttributeClick}
                    origin={"page"}
                    inStock={inStock}
                  />
                  <Button
                    onClick={() =>
                      inStock &&
                      this.props.addToCart({
                        id,
                        gallery,
                        brand,
                        name,
                        prices,
                        attributes,
                        currentAttributes,
                        currentProducts,
                      })
                    }
                    inStock={inStock}
                  >
                    ADD TO CART
                  </Button>
                </ProductAttributesContainer>
              ) : (
                ``
              )}
            </ProductCardThumbnail>
          ) : (
            <ProductCardOutOfStock>OUT OF STOCK</ProductCardOutOfStock>
          )}
          {this.state.productVisible ? (
            <>
              <ProductCardName>
                {brand} {name}
              </ProductCardName>
              <ProductCardPrice>
                {currentCurrency}
                {currencyPrice}
              </ProductCardPrice>
            </>
          ) : (
            ""
          )}
        </ProductCardLink>
      </ProductCardItem>
    );
  }
}

const mapStateToProps = (state) => ({
  currentCurrency: state.currency.currentCurrency,
  products: state.cart.products,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      id,
      gallery,
      brand,
      name,
      prices,
      attributes,
      currentAttributes,
      currentProducts
    ) =>
      dispatch(
        addToCart(
          id,
          gallery,
          brand,
          name,
          prices,
          attributes,
          currentAttributes,
          currentProducts
        )
      ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductCard));

//Styling

const ProductCardItem = styled.li`
  width: calc(386 / 1440 * 100vw);
  max-width: 386px;
  height: calc(444 / 1440 * 100vw);
  max-height: 444px;
  opacity: ${({ inStock }) => (inStock ? "1" : "0.5")};

  @media (max-width: 941px) {
    width: calc(386 / 941 * 100vw);
    height: calc(444 / 941 * 100vw);
  }

  @media (max-width: 527px) {
    width: calc(386 / 527 * 100vw);
    height: calc(444 / 527 * 100vw);
    margin: 0 calc(20 / 527 * 100vw);
  }

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
    opacity: unset;
  }
`;

const ProductCardLink = styled.a`
  position: relative;
  display: block;
  width: calc(386 / 1440 * 100vw);
  max-width: 386px;
  height: calc(444 / 1440 * 100vw);
  max-height: 444px;
  padding: calc(16 / 1440 * 100vw);
  cursor: pointer;

  @media (max-width: 941px) {
    width: calc(386 / 941 * 100vw);
    height: calc(444 / 941 * 100vw);
    padding: calc(16 / 941 * 100vw);
  }

  @media (max-width: 527px) {
    width: calc(386 / 527 * 100vw);
    height: calc(444 / 527 * 100vw);
    padding: calc(16 / 527 * 100vw);
  }

  @media (min-width: 1440px) {
    padding: 16px;
  }
`;

const ProductCardImage = styled.img`
  display: block;
  width: calc(354 / 1440 * 100vw);
  max-width: 354px;
  height: calc(330 / 1440 * 100vw);
  max-height: 330px;
  object-fit: contain;

  @media (max-width: 941px) {
    width: calc(354 / 941 * 100vw);
    height: calc(330 / 941 * 100vw);
  }

  @media (max-width: 527px) {
    width: calc(354 / 527 * 100vw);
    height: calc(330 / 527 * 100vw);
  }
`;

const ProductCardThumbnail = styled.div`
  position: absolute;
  top: calc(16 / 1440 * 100vw);
  overflow: visible;
  display: block;
  width: calc(354 / 1440 * 100vw);
  max-width: 354px;
  height: calc(330 / 1440 * 100vw);
  max-height: 330px;

  @media (max-width: 941px) {
    width: calc(354 / 941 * 100vw);
    height: calc(330 / 941 * 100vw);
    top: calc(16 / 941 * 100vw);
  }

  @media (max-width: 527px) {
    width: calc(354 / 527 * 100vw);
    height: calc(330 / 527 * 100vw);
    top: calc(16 / 527 * 100vw);
  }
`;

export const ProductOrder = styled.div`
  position: absolute;
  width: 70px;
  height: 40px;
  bottom: -90px;
  right: 0;
  display: flex;
  margin-right: 31px;
  flex-direction: row;
  align-items: flex-end;
  visibility: hidden;
  a:hover &,
  a:focus & {
    visibility: visible;
  }
`;

const ProductAddToCartButton = styled.svg`
  position: absolute;
  bottom: 72px;
  right: 0;
  width: 53px;
  height: 53px;
  overflow: visible;
  border: none;
  cursor: pointer;
  display: ${({ inStock }) => (inStock ? "default" : "none")};
  box-shadow: none;
`;

const ProductCardName = styled.h3`
  margin-top: calc(24 / 1440 * 100vw);
  font-weight: 300;
  font-size: calc(18 / 1440 * 100vw);
  line-height: 160%;

  @media (max-width: 941px) {
    font-size: calc(18 / 941 * 100vw);
    margin-top: calc(24 / 941 * 100vw);
  }

  @media (max-width: 527px) {
    font-size: calc(18 / 527 * 100vw);
    margin-top: calc(24 / 527 * 100vw);
  }

  @media (min-width: 1440px) {
    font-size: 18px;
    margin-top: 24px;
  }
`;

const ProductCardPrice = styled.p`
  font-weight: 500;
  font-size: calc(18 / 1440 * 100vw);
  line-height: 160%;

  @media (max-width: 941px) {
    font-size: calc(18 / 941 * 100vw);
  }

  @media (max-width: 527px) {
    font-size: calc(18 / 527 * 100vw);
  }

  @media (min-width: 1440px) {
    font-size: 18px;
  }
`;

const ProductCardOutOfStock = styled.p`
  position: absolute;
  left: 50%;
  top: calc(338 / 444 * 50%);
  transform: translate(-50%, -50%);
  font-weight: 400;
  font-size: calc(24 / 1440 * 100vw);
  line-height: 38.4px;

  @media (max-width: 941px) {
    font-size: calc(24 / 941 * 100vw);
  }

  @media (max-width: 527px) {
    font-size: calc(24 / 527 * 100vw);
  }

  @media (min-width: 1440px) {
    font-size: 24px;
  }

  a:hover &,
  a:focus & {
    opacity: 0.7;
    color: #45474e;
  }
`;

const ProductAttributesContainer = styled.div`
  background: white;
  position: absolute;
  top: calc(16 / 1440 * 100vw);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: calc(354 / 1440 * 100vw);
  max-width: 354px;
  height: calc(330 / 1440 * 100vw);
  max-height: 330px;
  transform: translateY(101%);
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 941px) {
    width: calc(354 / 941 * 100vw);
    height: calc(330 / 941 * 100vw);
    top: calc(16 / 941 * 100vw);
  }

  @media (max-width: 527px) {
    width: calc(354 / 527 * 100vw);
    height: calc(330 / 527 * 100vw);
    top: calc(16 / 527 * 100vw);
  }

  a:hover &,
  a:focus & {
    transform: translateY(-5%);
  }
`;

const Button = styled.button`
  padding: calc(16 / 1440 * 100vw) 0;
  margin-top: calc(8 / 1440 * 100vw);
  width: calc(354 / 1440 * 100vw);
  font-weight: 600;
  font-size: calc(16 / 1440 * 100vw);
  line-height: 120%;
  color: #fff;
  background-color: var(--accent-color);
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  display: ${({ inStock }) => (inStock ? "default" : "none")};

  @media (max-width: 941px) {
    font-size: calc(16 / 941 * 100vw);
    padding: calc(16 / 941 * 100vw) 0;
    width: calc(354 / 941 * 100vw);
  }

  @media (max-width: 527px) {
    font-size: calc(16 / 527 * 100vw);
    padding: calc(16 / 527 * 100vw) 0;
    width: calc(354 / 527 * 100vw);
  }

  @media (min-width: 1440px) {
    font-size: 16px;
    padding: 16px 0;
    width: 354px;
  }
`;
