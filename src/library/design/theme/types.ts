interface MarkColors {
  default: string;
  dark: string;
}

export interface Theme {
  palette: {
    primary: {
      default: string;
    };
    secondary: {
      default: string;
    };
    background: {
      default: string;
      light: string;
    };
    marks: {
      cross: MarkColors;
      nought: MarkColors;
    };
  };
  fonts: {
    fontFamily: {
      default: string;
    };
  };
  shape: {
    borderRadius: {
      default: string;
    };
  };
}
