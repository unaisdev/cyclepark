import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { onboardingStyles } from './onboardingStyles';
import { useUnistyles } from 'react-native-unistyles';

/** Espacio bajo la cabecera flotante (safe area + barra progreso + back). */
const HEADER_OVERLAY_PAD = 76;
/** Separación entre el scroll y la franja del CTA fijo. */
const SCROLL_GAP_ABOVE_FOOTER = 16;

type Props = {
  children: ReactNode;
  /** CTA fijo abajo (continuar / permitir / finalizar + enlaces secundarios). */
  footer?: ReactNode;
};

export function OnboardingSlideShell({ children, footer }: Props) {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const topPad = insets.top + HEADER_OVERLAY_PAD;
  const footerBottomPad = Math.max(insets.bottom, 12) + 8;

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        gap: theme.layout.space4,
      }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          onboardingStyles.scroll,
          {
            flexGrow: 1,
            paddingTop: topPad,
            paddingBottom: footer ? SCROLL_GAP_ABOVE_FOOTER : footerBottomPad,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        {children}
      </ScrollView>
      {footer != null ? (
        <View style={[onboardingStyles.slideFooterWrap, { paddingBottom: footerBottomPad }]}>
          {footer}
        </View>
      ) : null}
    </View>
  );
}
