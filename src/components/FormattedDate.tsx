import moment from 'moment';

type FormattedDateProps = {
  value?: string | number | Date | null;
  format?: string;
};

export const FormattedDate = ({
  value,
  format = 'LLL',
}: FormattedDateProps) => {
  if (value == null) return null;
  const m = moment(value);
  if (!m.isValid()) return null;
  return <time dateTime={m.toISOString()}>{m.format(format)}</time>;
};
