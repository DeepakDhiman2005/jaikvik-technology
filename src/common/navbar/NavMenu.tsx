import { Menu, Dropdown } from "antd";
import type { MenuProps } from "antd";
import type navmenuInterface from "../../interfaces/navmenuInterface";
import { Link } from "react-router-dom";

const NavMenu: React.FC<navmenuInterface> = ({
  title = "",
  menu = [],
  href = "",
}) => {
  const items: MenuProps["items"] = menu.map((item, index) => ({
    key: index,
    label: (
      <Link to={item.href as string} className="container-img relative block">
        <img
          src={item.img}
          alt={item.text}
          className="w-full rounded-md shadow-lg"
        />
        <div className="image-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 text-white font-medium text-sm text-center px-3 py-2 w-4/5">
          {item.text}
        </div>
      </Link>
    ),
  }));

  const menuContent = (
    <Menu
      items={items}
      className="custom-mega-menu !bg-main-secondary/20 backdrop-blur-md shadow-lg p-5 rounded-md"
      style={{
        width: "80vw",
        maxWidth: "calc(100vw - 32px)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "8px",
        backdropFilter: "blur(12px)",
      }}
    />
  );

  return (
    <Dropdown
      overlay={menuContent}
      trigger={["hover"]}
      overlayClassName="mega-dropdown"
      placement="bottom"
      overlayStyle={{
        backgroundColor: "transparent",
        boxShadow: "none",
        backdropFilter: "blur(12px)",
      }}
    >
      <li className="text-uppercase group">
        <Link
          to={href}
          className="text-white uppercase font-semibold transition-all duration-300 px-2.5 py-2.5 hover:text-red-500 flex items-center"
        >
          {title}
        </Link>
      </li>
    </Dropdown>
  );
};

export default NavMenu;
