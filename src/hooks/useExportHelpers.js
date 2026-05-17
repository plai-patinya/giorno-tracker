const useExportHelpers = ({

  exportedData,

  setNotification

}) => {

  // 📋 Copy JSON
  const copyToClipboard = () => {

    navigator.clipboard
      .writeText(exportedData)

      .then(() => {

        setNotification({
          show: true,
          message:
            '✓ คัดลอกข้อมูลสำเร็จ! บันทึกลง Notes หรือ iCloud',
          type: 'success'
        });

      })

      .catch(() => {

        setNotification({
          show: true,
          message:
            '⚠ กรุณาคัดลอกด้วยตนเอง',
          type: 'warning'
        });

      });

  };

  // 💾 Download JSON
  const downloadAsFile = () => {

    try {

      const blob = new Blob(
        [exportedData],
        {
          type: 'application/json'
        }
      );

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement('a');

      link.href = url;

      link.download =
        `giorno-backup-${
          new Date()
            .toISOString()
            .split('T')[0]
        }.json`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);

      setNotification({
        show: true,
        message:
          '✓ ดาวน์โหลดสำเร็จ',
        type: 'success'
      });

    } catch (error) {

      setNotification({
        show: true,
        message:
          '⚠ ใช้วิธีคัดลอกแทน',
        type: 'warning'
      });

    }

  };

  return {

    copyToClipboard,

    downloadAsFile

  };

};

export default useExportHelpers;