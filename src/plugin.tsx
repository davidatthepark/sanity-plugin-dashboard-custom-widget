import React from "react";
import {
  DashboardWidgetContainer,
  DashboardWidget,
  LayoutConfig,
} from "@sanity/dashboard";

export interface CustomWidgetProps {
  component: Function | string;
  componentProps?: object;
  header?: string;
  footer?: Function | string;
}

export interface customWidgetConfig extends CustomWidgetProps {
  layout?: LayoutConfig;
}

const CustomWidget = (props: CustomWidgetProps) => {
  if (typeof props.component === "string") return <>{props.component}</>;

  let footer;
  if (props.footer) {
    if (typeof props.footer === "string") {
      footer = props.footer;
    } else {
      footer = props.footer();
    }
  }

  return (
    <DashboardWidgetContainer header={props.header} footer={footer}>
      <props.component {...props.componentProps} />
    </DashboardWidgetContainer>
  );
};

export const customWidget = (config: customWidgetConfig): DashboardWidget => {
  return {
    name: "custom-widget",
    component: () => {
      return (
        <CustomWidget
          component={config.component}
          componentProps={config.componentProps}
          header={config.header}
          footer={config.footer}
        />
      );
    },
    layout: config.layout,
  };
};
