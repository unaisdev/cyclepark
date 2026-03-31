import { StyleSheet } from 'react-native-unistyles';
import { mapHomeChrome } from '../map/mapHomeTheme';

export const onboardingStyles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.app.background,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: theme.layout.space5,
  },
  /** Overline tipo Stitch: caps + aire, suele teñirse con primary (~70% opacidad) en welcome. */
  overline: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    lineHeight: 14,
    textTransform: 'uppercase',
    color: theme.app.textMuted,
    marginBottom: theme.layout.space3,
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: '700',
    letterSpacing: -0.85,
    lineHeight: 44,
    color: theme.app.textPrimary,
    marginBottom: theme.layout.space4,
  },
  /** Línea bajo el wordmark en la slide de bienvenida (sin repetir el nombre de la app). */
  welcomeTagline: {
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.35,
    lineHeight: 28,
    color: theme.app.textPrimary,
    marginTop: theme.layout.space5,
    marginBottom: theme.layout.space4,
  },
  /** Título de paso (idioma, permisos, legal): escala editorial alineada al mockup Stitch ~32–34sp. */
  stepTitle: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.65,
    lineHeight: 38,
    color: theme.app.textPrimary,
    marginBottom: theme.layout.space6,
  },
  body: {
    ...theme.typography.body,
    fontSize: 17,
    color: theme.app.textSecondary,
    lineHeight: 26,
    marginBottom: theme.layout.space5,
  },
  legalPanel: {
    borderRadius: theme.layout.radiusLg,
    backgroundColor: theme.app.surface,
    paddingVertical: theme.layout.space5,
    paddingHorizontal: theme.layout.space4,
    marginBottom: theme.layout.space5,
    ...mapHomeChrome.ambientShadow,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.layout.space3,
    marginBottom: theme.layout.space4,
    paddingVertical: theme.layout.space1,
  },
  checkRowLast: {
    marginBottom: 0,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.app.borderSubtle,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.app.background,
  },
  checkBoxOn: {
    borderColor: theme.app.primary,
    backgroundColor: theme.app.primary,
  },
  checkLabel: {
    ...theme.typography.body,
    fontSize: 16,
    color: theme.app.textPrimary,
    flex: 1,
    lineHeight: 24,
  },
  versionCaption: {
    ...theme.typography.caption,
    color: theme.app.textMuted,
    marginTop: theme.layout.space2,
    marginBottom: theme.layout.space3,
  },
  optionRow: {
    minHeight: 56,
    paddingHorizontal: theme.layout.space4,
    borderRadius: theme.layout.radiusLg,
    backgroundColor: theme.app.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.layout.space3,
    ...mapHomeChrome.ambientShadow,
  },
  optionRowSelected: {
    backgroundColor: theme.app.primaryContainer,
  },
  optionLabel: {
    ...theme.typography.body,
    fontSize: 16,
    color: theme.app.textPrimary,
  },
  optionLabelOnPrimary: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  slideFooterWrap: {
    paddingHorizontal: theme.layout.space5,
    paddingTop: theme.layout.space5,
    backgroundColor: theme.app.background,
    borderTopWidth: 1,
    borderTopColor: theme.app.surfaceHighest,
  },
  footerActionsColumn: {
    width: '100%',
    gap: theme.layout.space3,
    alignItems: 'stretch',
  },
  linkBtn: {
    alignSelf: 'center',
    paddingVertical: theme.layout.space3,
    paddingHorizontal: theme.layout.space4,
    minHeight: 48,
    justifyContent: 'center',
  },
  linkLabel: {
    ...theme.typography.body,
    fontSize: 16,
    fontWeight: '500',
    color: theme.app.neutralSecondary,
  },
}));
