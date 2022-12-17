import { Component } from "react";
import client from "../GraphQL/apolloClient";
import { getProduct } from "../GraphQL/product";
import parse from "html-react-parser";
import styled from "styled-components";
import ProductAttributes from "../components/Product/ProductAttributes";
import withRouter from "../components/HOC/withRouter";
import { addToCart } from "../redux/slices/cartSlice";
import { connect } from "react-redux";

class ProductDetails extends Component {
  state = {
    product: {},
    currentImage: "",
    currentAttributes: [],
  };

  fetchProduct = async () => {
    const result = await client.query({
      query: getProduct,
      variables: {
        productId: this.props.router.params.productId,
      },
    });
    this.setState({ product: result.data.product });
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

  currentImageClick = (event) => {
    this.setState({ currentImage: event.target.currentSrc });
  };

  componentDidMount() {
    this.fetchProduct();
  }

  render() {
    const {
      id,
      gallery,
      brand,
      name,
      attributes,
      prices,
      description,
      inStock,
    } = this.state.product;
    const currentProducts = [...this.props.products];
    const { currentCurrency } = this.props;
    const { currentImage, currentAttributes } = this.state;
    const currentAmount = prices?.find(
      ({ currency }) => currency.symbol === currentCurrency
    );

    return (
      <ProductContainer inStock={inStock}>
        <ProductGalleryList>
          {gallery?.map((image, index) => (
            <ProductGalleryItem key={index}>
              <ProductGalleryImages
                src={image}
                onClick={this.currentImageClick}
              />
            </ProductGalleryItem>
          ))}
        </ProductGalleryList>
        <ProductImageBox>
          {gallery && <ProductMainImage src={currentImage || gallery[0]} />}
          {!inStock && <OutOfStock>OUT OF STOCK</OutOfStock>}
        </ProductImageBox>
        <ProductDescription>
          <ProductBrand>{brand}</ProductBrand>
          <ProductName>{name}</ProductName>
          <ProductAttributes
            attributes={attributes}
            currentAttributes={currentAttributes}
            handleAttributeClick={this.handleAttributeClick}
            origin={"page"}
            inStock={inStock}
          />
          <ProductPrice>Price:</ProductPrice>
          <ProductPriceValue>
            {currentCurrency}
            {currentAmount?.amount}
          </ProductPriceValue>
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
          >
            ADD TO CART
          </Button>
          <ProductDescriptionText>
            {parse(`${description}`)}
          </ProductDescriptionText>
        </ProductDescription>
      </ProductContainer>
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
)(withRouter(ProductDetails));

//styling

const ProductGalleryList = styled.ul`
  height: 511px;
  width: 79px;
  min-inline-size: max-content;
  display: block;
  list-style-type: none;
  overflow: auto;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1190px) {
    height: calc(511 / 1190 * 100vw);
  }

  @media (max-width: 720px) {
    margin: auto;
  }
`;

const ProductGalleryItem = styled.li`
  width: 79px;
  height: 80px;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;

const ProductGalleryImages = styled.img`
  width: 79px;
  height: 80px;
  object-fit: contain;
`;

const ProductImageBox = styled.div`
  position: relative;
  height: 511px;

  @media (max-width: 1190px) {
    height: calc(511 / 1190 * 100vw);
  }
`;

const ProductMainImage = styled.img`
  margin: 0 calc(100 / 1440 * 25vw) 0 calc(40 / 1190 * 50vw);
  width: 610px;
  height: 511px;
  object-fit: contain;

  @media (max-width: 1190px) {
    width: calc(610 / 1190 * 90vw);
    height: calc(511 / 1190 * 90vw);
  }

  @media (min-width: 1300px) {
    margin: 0 100px 0 40px;
  }
`;

const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 720px) {
    margin: auto;
  }
`;

const ProductBrand = styled.h3`
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;

  @media (max-width: 1024px) {
    font-size: calc(30 / 1024 * 100vw);
  }

  @media (max-width: 720px) {
    margin-top: 16px;
    font-size: 30px;
  }
`;

const ProductName = styled.p`
  margin-bottom: 19px;
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;

  @media (max-width: 1024px) {
    font-size: calc(30 / 1024 * 100vw);
  }

  @media (max-width: 720px) {
    margin-bottom: 10px;
    font-size: 30px;
  }
`;

const ProductPrice = styled.p`
  margin: 38px 0 10px;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;

  @media (max-width: 1024px) {
    font-size: calc(18 / 1024 * 100vw);
  }

  @media (max-width: 720px) {
    margin: 18px 0 10px;
    font-size: 18px;
  }
`;

const ProductPriceValue = styled.p`
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 24px;
  line-height: 18px;

  @media (max-width: 1024px) {
    font-size: calc(24 / 1024 * 100vw);
  }

  @media (max-width: 720px) {
    font-size: 24px;
  }
`;

const Button = styled.button`
  margin-bottom: 40px;
  height: 52px;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  color: #fff;
  background-color: var(--accent-color);
  border: 0;

  @media (max-width: 720px) {
    margin-bottom: 20px;
  }
`;

const ProductDescriptionText = styled.header`
  position: absolute;
  top: 55vw;
  left: 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 25.59px;

  @media (max-width: 1024px) {
    top: 591px;
  }

  @media (max-width: 720px) {
    position: static;
    width: 292px;
  }

  @media (min-width: 1440px) {
    position: static;
    width: 292px;
  }
`;

const ProductContainer = styled.section`
  position: relative;
  display: flex;
  padding-top: calc(160 / 1440 * 100vw);
  opacity: ${({ inStock }) => (inStock ? "1" : "0.5")};

  @media (max-width: 1024px) {
    padding-top: 114px;
  }

  @media (max-width: 720px) {
    flex-wrap: wrap;
  }

  @media (min-width: 1440px) {
    padding-top: 160px;
  }

  ${Button} {
    cursor: ${({ inStock }) => (inStock ? "pointer" : "default")};
  }
`;

const OutOfStock = styled.p`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: 400;
  font-size: calc(24 / 1440 * 100vw);
  line-height: 38.4px;

  @media (min-width: 1300px) {
    margin-left: -40px;
    font-size: 24px;
  }
`;
