import { ThemeOptions} from '@mui/material/styles';
import { experimental_extendTheme as extendTheme} from '@mui/material/styles';


const themeOptions: ThemeOptions = {
  // palette: {
  //   mode:'dark',
  //   primary: {
  //     '50': '#f0fdfa',
  //     '100': '#ccfbf1',
  //     '200': '#99f6e4',
  //     '300': '#5eead4',
  //     '400': '#2dd4bf',
  //     '500': '#14b8a6',
  //     '600': '#0d9488',
  //     '700': '#0f766e',
  //     '800': '#115e59',
  //     '900': '#134e4a',
  //     contrastText:'#000000'

  //   },
  //   success: {
  //     '50': '#f1f8e9',
  //     '100': '#dcedc8',
  //     '200': '#c5e1a5',
  //     '300': '#aed581',
  //     '400': '#9ccc65',
  //     '500': '#8bc34a',
  //     '600': '#7cb342',
  //     '700': '#689f38',
  //     '800': '#558b2f',
  //     '900': '#33691e',
  //     contrastText:'#000000'

  //   },
  //   info: {
  //     '50': '#ecfeff',
  //     '100': '#cffafe',
  //     '200': '#a5f3fc',
  //     '300': '#67e8f9',
  //     '400': '#22d3ee',
  //     '500': '#06b6d4',
  //     '600': '#0891b2',
  //     '700': '#0e7490',
  //     '800': '#155e75',
  //     '900': '#164e63',
  //     contrastText:'#000000'

  //   },
  //   warning: {
  //     '50': '#f9fbe7',
  //     '100': '#f0f4c3',
  //     '200': '#e6ee9c',
  //     '300': '#dce775',
  //     '400': '#d4e157',
  //     '500': '#cddc39',
  //     '600': '#c0ca33',
  //     '700': '#afb42b',
  //     '800': '#9e9d24',
  //     '900': '#827717',
  //     contrastText:'#FFFFFF'

  //   },
  //   error: {
  //     '50': '#fbe9e7',
  //     '100': '#ffccbc',
  //     '200': '#ffab91',
  //     '300': '#ff8a65',
  //     '400': '#ff7043',
  //     '500': '#ff5722',
  //     '600': '#f4511e',
  //     '700': '#e64a19',
  //     '800': '#d84315',
  //     '900': '#bf360c',
  //     light: '#ba68c8',
  //     dark: '#7b1fa2',
  //     main: '#aa00ff',
  //     contrastText:'#FFFFFF'
  //   },
  //   secondary: {
  //     main: '#40c4ff',
  //     contrastText:'#FFFFFF'

  //   },
  // },
  // typography: {
  //   fontFamily:"Belanosima, sans-serif",
  //   fontSize: 12,
  //   fontWeightLight: 100,
  //   fontWeightRegular: 500,
  //   fontWeightMedium: 700,
  //   fontWeightBold: 800,
  //   htmlFontSize: 15,
  // },
  components: {
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color:'#14b8a6'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // color:''
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color:'#14b8a6'
        }
      }
    },

    
  }
};
export const theme = extendTheme(themeOptions);
