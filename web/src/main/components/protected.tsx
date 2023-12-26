import React, { useEffect, useRef } from "react";

const Protected = ({ token }: { token: string }) => {
  const isRun = useRef(false);

  useEffect(() => {
    console.log(token);
    if (isRun.current) return;

    isRun.current = true;
  }, []);

  return <div>Protected</div>;
};

export default Protected;
