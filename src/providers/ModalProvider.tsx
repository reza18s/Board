"use client";

import React, { useEffect, useState } from "react";
import useStore from "@/stores/useStore";
import { useModal } from "@/stores/useModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const Model = useStore(useModal, (state) => state.modal);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <>{Model}</>;
};
