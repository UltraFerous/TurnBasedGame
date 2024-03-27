import { React, useContext } from "react";
import PlayerContext from "../context/playerContext";

function StatDisplay() {
  const { player, setPlayer } = useContext(PlayerContext);

  return (
    <div className="statBlocks">
      <div className="playerPortrait"></div>
      <div className="primaryStats">
        <div>
          Strength: {player.stats.strength + player.statModifiers.strengthMod}
        </div>
        <div>
          Toughness:
          {player.stats.toughness + player.statModifiers.toughnessMod}
        </div>
        <div>Power: {player.stats.power + player.statModifiers.powerMod}</div>
        <div>
          Ranged Skill:
          {player.stats.skill.ranged + player.statModifiers.skillMod}
        </div>
        <div>
          Melee Skill:
          {player.stats.skill.melee + player.statModifiers.skillMod}
        </div>
      </div>
      <div>
        <div>
          Wounds: {player.stats.currentWounds} / {player.stats.wounds}
        </div>
        <div>Save: {player.save.armour + player.statBonuses.armourBonus}</div>
        {player.save.shield <= 10 && (
          <div>Shield: {player.save.shield}+</div>
        )}
      </div>
      <div className="secondaryStats">
        <div>
          Damage Modifier:
          {player.statBonuses.damageBonus + player.statModifiers.damageMod}
        </div>
        <div>
          Attacks Modifier:
          {player.statBonuses.attacksBonus + player.statModifiers.attacksMod}
        </div>
        <div> Money: ¤{player.scores.money}.00</div>
      </div>
    </div>
  );
}

export default StatDisplay;
