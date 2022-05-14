import style from "./Stats.module.css";
import Card from "../UI/Card";

const Stats = (props) => {
  return (
    <div className={style.stats}>
      <Card className={style.cardStats}>
        <h3 className={style.pStyle}>TOTAL COST</h3>

        <p className={style.pStyle}>{props.statistics.totalSum}</p>
      </Card>
      <Card className={style.cardStats}>
        <h3 className={style.pStyle}>HIGHEST EXPENSE</h3>

        <p className={style.pStyle}>{props.statistics.highestExpense}</p>
      </Card>
      <Card className={style.cardStats}>
        <h3 className={style.pStyle}>AVERAGE COST</h3>

        <p className={style.pStyle}>{props.statistics.averageCost.toFixed(2)}</p>
      </Card>
    </div>
  );
};

export default Stats;
