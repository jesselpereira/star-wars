import React from "react";
import '../App.css';
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();
  return(
      <div className="App">
      <header className="App-header">
        <h1>{t('header.title')}</h1>
      </header>
    </div>
  );
}

export default Header