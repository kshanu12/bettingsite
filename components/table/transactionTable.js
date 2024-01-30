import DEPLOYED_URL from "@/constants/deploymentURL";
import styles from "./table.module.css";
import { useRouter } from "next/router";
import axios from "axios";

export default function TransactionTable(props) {
  const transactionProceedHandler = async (
    transactionId,
    transactionCoins,
    transactionType
  ) => {
    console.log(transactionCoins);
    console.log(props.username);
    if (props.username) {
      const actualCoins =
        transactionType === "Deposit"
          ? props.coins + transactionCoins
          : props.coins - transactionCoins;
      console.log(actualCoins);
      const res = await axios.put(DEPLOYED_URL + "/user/" + props.username, {
        coins: actualCoins,
        transactionId,
      });
      console.log(res);
      props.setToggleState(!props.toggleState);
    }
  };

  const transactionAbortHandler = () => {
    console.log("abort");
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
            props.data.map((user, index) => {
              const formattedDate = new Date(user.requestedAt).toLocaleString(
                "en-US",
                {
                  day: "numeric",
                  month: "short",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                  timeZone: "IST",
                }
              );

              const coinColor =
                user.transactionType === "Deposit"
                  ? "text-green-500"
                  : "text-red-500";

              return (
                <div key={index} className={styles.tableData}>
                  <div className={styles.tableCell}>{formattedDate}</div>
                  <div className={`${styles.tableCell} ${coinColor}`}>
                    {user.coins}
                  </div>
                  <div className={styles.tableCell}>
                    {user.processed ? (
                      user.transactionType === "Deposit" ? (
                        "Deposited"
                      ) : (
                        "Withdrawn"
                      )
                    ) : props.isAdmin ? (
                      <div className="flex justify-center gap-2">
                        <div
                          className="border text-green-500 rounded px-2 py-1 font-bold text-3xl"
                          onClick={() =>
                            transactionProceedHandler(
                              user.id,
                              user.coins,
                              user.transactionType
                            )
                          }
                        >
                          &#x2713;
                        </div>
                        <div
                          className="border text-red-500 rounded px-2 pb-1 font-bold text-4xl"
                          onClick={transactionAbortHandler}
                        >
                          &times;
                        </div>
                      </div>
                    ) : (
                      "Under Process"
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
