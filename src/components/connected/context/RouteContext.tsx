import React from "react";
interface ConnectedContextProps {
  currentIndexTabBar: number;
  setCurrentIndexTabBar: (arg0: number) => void;
}

const ConnectedContext = React.createContext<ConnectedContextProps | null>(null);

export default ConnectedContext;
