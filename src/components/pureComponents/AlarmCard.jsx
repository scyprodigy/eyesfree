// @flow
import React, { useState, useEffect } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import R from "ramda";
import { Statistic } from "antd";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import axios from "axios";
type tProps = {
  // LineChartCard parameters
  alarms: Array<mixed>,
  type: string,
  onClick: Function
};
// type = alarm | close | ack | read

const AlarmCardEssential = ({ style, title, context, onClick }) => {
  return (
    <div className={style} style={{ height: "200px" }} onClick={onClick}>
      <div className="card-body">
        <h3 className="card-title text-white">{title}</h3>
        <span className="card-text align-bottom">{context}</span>
      </div>
    </div>
  );
};

export const AckAlarmCard = (props: tProps) => {
  const { alarms = [], onClick } = props;
  const { t } = useTranslation();

  const [count, setCount] = useState(0);

  const matchType = type => R.filter(i => i.state == type);

  useDeepCompareEffect(() => {
    const _matchAlarms = matchType("ack")(alarms) || [];
    setCount(_matchAlarms.length);
  }, [alarms]);

  // const mainClass = classNames("card", "text-white", getColor());

  return (
    <AlarmCardEssential
      onClick={onClick}
      style="card text-white bg-info "
      title={t("alarm.ackContext")}
      context={t("alarm.ackContext") + count}
    />
  );
};

export const AlarmCard = (props: tProps) => {
  const { alarms = [], onClick } = props;
  const { t } = useTranslation();

  const [count, setCount] = useState(0);

  // title t("alarm.ack")
  // context t("alarm.ackContext")
  // color : bg-info

  const matchType = type => R.filter(i => i.state == type);

  useDeepCompareEffect(() => {
    const _matchAlarms = matchType("alarm")(alarms) || [];
    setCount(_matchAlarms.length);
  }, [alarms]);

  // const mainClass = classNames("card", "text-white", getColor());

  return (
    <AlarmCardEssential
      onClick={onClick}
      style="card text-white bg-danger "
      title={t("alarm.alarmCount")}
      context={t("alarm.alarmContext") + count}
    />
  );
};

export const NormalDeviceCard = (props: {
  count: Number,
  onClick: Function
}) => {
  const { t } = useTranslation();
  const { count, onClick } = props;

  // const mainClass = classNames("card", "text-white", getColor());

  return (
    <AlarmCardEssential
      onClick={onClick}
      style="card text-white bg-primary "
      title={t("device.normalDeviceCount")}
      context={t("device.normalDeviceCountContext") + count}
    />
  );
};

export const AlarmDeviceCard = (props: {
  count: Number,
  onClick: Function
}) => {
  const { t } = useTranslation();
  const { count, onClick } = props;

  // const mainClass = classNames("card", "text-white", getColor());

  return (
    <AlarmCardEssential
      onClick={onClick}
      style="card text-white bg-danger "
      title={t("device.alarmDeviceCount")}
      context={t("device.alarmDeviceCountContext") + count}
    />
  );
};

export const AckDeviceCard = (props: { count: Number, onClick: Function }) => {
  const { t } = useTranslation();
  const { count, onClick } = props;

  // const mainClass = classNames("card", "text-white", getColor());

  return (
    <AlarmCardEssential
      onClick={onClick}
      style="card text-white bg-info "
      title={t("device.ackDeviceCount")}
      context={t("device.ackDeviceCountContext") + count}
    />
  );
};

export default AlarmCard;
