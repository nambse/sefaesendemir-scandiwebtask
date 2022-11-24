import {Component} from "react";
import client from "../../../GraphQL/apolloClient";
import {getAllCategories} from "../../../GraphQL/category";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import withRouter from "../../HOC/withRouter";

class HeaderNavigation extends Component {

    state = {
        categories: [],
    }

    fetchCategories = async () => {
        const res = await client.query({
            query: getAllCategories,
        });
        this.setState({ categories: res.data.categories });
    }

    componentDidMount() {
        this.fetchCategories()
    }

    render(){
        const { categories } = this.state;
        return(
        <nav>
            <HeaderList>
                {categories?.map(({name}, index) => (
                    <li key={index}>
                        <HeaderLink to={`category/${name}`}>
                            {name}
                        </HeaderLink>
                    </li>
                ))}
            </HeaderList>
        </nav>
    )
    }
}

export default withRouter(HeaderNavigation);

//styling

const HeaderList = styled.ul`
    display: flex;
    list-style-type: none;
    cursor: pointer;
`;

const HeaderLink = styled(NavLink)`
    padding: 4px 1vw 32px 1vw;
	text-transform: uppercase;
	font-size: 16px;
	font-weight: 400;
	letter-spacing: 0px;
	color: ${({ location, children }) =>
    location === "/" && children === "all" ? "var(--accent-color)" : "var(--main-text-color)"};
	border-bottom: ${({ location, children }) =>
    location === "/" && children === "all" ? "2px solid var(--accent-color)" : ""};

	&.active {
		color: var(--accent-color);
		border-bottom: 2px solid var(--accent-color);
	}

	&:hover {
		color: var(--accent-color);
	}
`;