const Loading: React.FC = () => {
  return (
    <div className="medical-loader">
      <div className="medical-loader_pulse" />
      <div className="medical-loader_bars">
        <span />
        <span />
        <span />
      </div>
      <p className="medical-loader_text">Processing  data…</p>
    </div>
  );
};

export default Loading;