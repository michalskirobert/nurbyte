import Image from "next/image";
import styles from "./NurByteLogo.module.scss";

type NurByteLogoProps = {
  priority?: boolean;
};

export default function NurByteLogo({ priority = false }: NurByteLogoProps) {
  return (
    <span className={styles.logo} aria-hidden="true">
      <Image
        className={styles.mark}
        src="/assets/brand/nurbyte-mark.png"
        alt=""
        width={54}
        height={54}
        priority={priority}
      />
      <span className={styles.wordmark}>
        <b>Nur</b>Byte
        <small>Software Lab &lt;/&gt;</small>
      </span>
    </span>
  );
}
