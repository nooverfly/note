import React, { useState } from "react";
import "./style.scss";

function HeadBar() {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div
          className="header"
          style={{ background: theme === "light" ? "#eee" : "#000" }}
        >
          <LocaleContext.Consumer>
            {({ locale }) => (
              <ul>
                <li style={{ color: theme === "light" ? "#000" : "#fff" }}>
                  {locale === "en" ? "Home" : "主页"}
                </li>
                <li style={{ color: theme === "light" ? "#000" : "#fff" }}>
                  {locale === "en" ? "About" : "关于"}
                </li>
                <li style={{ color: theme === "light" ? "#000" : "#fff" }}>
                  {locale === "en" ? "Help" : "帮助"}
                </li>
              </ul>
            )}
          </LocaleContext.Consumer>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

function SideBar() {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <UserContext.Consumer>
          {({ userVal }) => (
            <div
              className="side-bar"
              style={{ background: theme === "light" ? "#ddd" : "#000" }}
            >
              <ul>
                <li style={{ color: theme === "light" ? "#000" : "#fff" }}>
                  {userVal === "admin" ? "管理一" : "菜单一"}
                </li>
                <li style={{ color: theme === "light" ? "#000" : "#fff" }}>
                  {userVal === "admin" ? "管理二" : "菜单二"}
                </li>
                <li style={{ color: theme === "light" ? "#000" : "#fff" }}>
                  {userVal === "admin" ? "管理三" : "菜单三"}
                </li>
              </ul>
            </div>
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

function MainContent() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <UserContext.Consumer>
          {({ toggleUser }) => (
            <div className="content">
              <LocaleContext.Consumer>
                {({ locale, toggleLocale }) => (
                  <button
                    style={{
                      background: theme === "light" ? "#ddd" : "#000",
                      color: theme === "light" ? "#000" : "#fff",
                    }}
                    onClick={(e) => {
                      console.log(e);
                      toggleTheme();
                      toggleUser();
                      toggleLocale();
                    }}
                  >
                    {locale === "en" ? "click" : "点击"}
                  </button>
                )}
              </LocaleContext.Consumer>
            </div>
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

const theme = {
  theme: "light",
  toggleTheme: () => {},
};

const user = {
  userVal: "admin",
  toggleUser: () => {},
};

const locale = {
  locale: "en",
  toggleLocale: () => {},
};

const ThemeContext = React.createContext(theme);
const UserContext = React.createContext(user);
const LocaleContext = React.createContext(locale);

export default function ContextDemo() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const [user, setUser] = useState("admin");
  const toggleUser = () => {
    setUser(user === "admin" ? "client" : "admin");
  };

  const [locale, setLocale] = useState("en");
  const toggleLocale = () => {
    setLocale(locale === "en" ? "zh" : "en");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <UserContext.Provider
        value={{
          userVal: user,
          toggleUser,
        }}
      >
        <LocaleContext.Provider
          value={{
            locale,
            toggleLocale,
          }}
        >
          <div className="root">
            <HeadBar />
            <div className="wrapper">
              <SideBar />
              <MainContent />
            </div>
          </div>
        </LocaleContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}
