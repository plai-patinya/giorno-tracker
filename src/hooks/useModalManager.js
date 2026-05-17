import { useState } from "react";

const useModalManager = () => {

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showFuelModal, setShowFuelModal] =
    useState(false);

  const [showExportModal, setShowExportModal] =
    useState(false);

  const [showImportModal, setShowImportModal] =
    useState(false);

  const [showExportMenu, setShowExportMenu] =
    useState(false);

  return {

    showAddModal,
    setShowAddModal,

    showFuelModal,
    setShowFuelModal,

    showExportModal,
    setShowExportModal,

    showImportModal,
    setShowImportModal,

    showExportMenu,
    setShowExportMenu

  };

};

export default useModalManager;