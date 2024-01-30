import styles from "./table.module.css";
import { useRouter } from "next/router";

export default function Table(props) {
  const router = useRouter();

  const handleClickedUsername = (username) => {
    console.log(username);
    router.push("/admin/user/" + username);
  };

  return (
    <>
      <div className={props.className}>
        <div>
          <div className={styles.tableHeading}>
            {props.tableHeading &&
              props.tableHeading.map((heading, index) => (
                <div key={index} className={styles.tableCell}>
                  {heading}
                </div>
              ))}
          </div>
          {props.data &&
            props.data.map((user, index) => (
              <div
                key={index}
                className={styles.tableData}
                onClick={() => handleClickedUsername(user.username)}
              >
                <div className={styles.tableCell}>{index + 1}</div>
                <div className={styles.tableCell}>{user.username}</div>
                <div className={styles.tableCell}>
                  {user.coins ? user.coins : 0}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
