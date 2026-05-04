import { useState, useEffect, useRef, useMemo } from 'react';
import {
  ChevronLeft, Play, Pause, SkipForward, RotateCcw, Clock,
  ChevronRight, Check, Flame, X, Volume2, VolumeX, Search,
  Plus, Shuffle, Trash2
} from 'lucide-react';

// ====================================================================
// POSE ILLUSTRATIONS — stylized stick figures showing each stretch
// ====================================================================

const Pose = ({ name, color = '#fafafa', accent, size = 110 }) => {
  const c = color;
  const a = accent || '#D4FF00';
  const props = {
    viewBox: '0 0 100 100',
    width: size,
    height: size,
    fill: 'none',
    stroke: c,
    strokeWidth: 2.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  const floor = <line x1="6" y1="93" x2="94" y2="93" stroke={c} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 3" />;
  const wall = (x = 90) => <line x1={x} y1="8" x2={x} y2="93" stroke={c} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 3" />;
  const head = (cx, cy, r = 6, col = c) => <circle cx={cx} cy={cy} r={r} fill={col} stroke="none" />;

  switch (name) {
    case 'neck-tilt':
      return (
        <svg {...props}>
          {floor}
          {head(54, 22, 6, a)}
          <line x1="50" y1="28" x2="50" y2="58" />
          <line x1="40" y1="32" x2="60" y2="32" />
          <path d="M 60 32 Q 75 28 60 17" stroke={a} strokeWidth="3" />
          <line x1="40" y1="32" x2="36" y2="55" />
          <line x1="50" y1="58" x2="42" y2="92" />
          <line x1="50" y1="58" x2="58" y2="92" />
        </svg>
      );

    case 'shoulder-rolls':
      return (
        <svg {...props}>
          {floor}
          {head(50, 20)}
          <line x1="50" y1="26" x2="50" y2="58" />
          <line x1="38" y1="32" x2="62" y2="32" stroke={a} strokeWidth="3.2" />
          <path d="M 38 32 Q 30 38 38 50" stroke={a} strokeWidth="3" />
          <path d="M 62 32 Q 70 38 62 50" stroke={a} strokeWidth="3" />
          <line x1="50" y1="58" x2="42" y2="92" />
          <line x1="50" y1="58" x2="58" y2="92" />
        </svg>
      );

    case 'trap-stretch':
      return (
        <svg {...props}>
          {floor}
          {head(46, 22, 6, a)}
          <line x1="50" y1="28" x2="50" y2="58" />
          <line x1="40" y1="32" x2="60" y2="32" />
          <path d="M 40 32 Q 30 30 35 18" stroke={a} strokeWidth="3" />
          <path d="M 60 32 Q 65 45 55 50" />
          <line x1="50" y1="58" x2="42" y2="92" />
          <line x1="50" y1="58" x2="58" y2="92" />
        </svg>
      );

    case 'door-chest':
      return (
        <svg {...props}>
          {floor}
          {wall(78)}
          {head(46, 22)}
          <line x1="46" y1="28" x2="46" y2="60" />
          <line x1="36" y1="34" x2="56" y2="34" />
          <path d="M 56 34 L 75 22" stroke={a} strokeWidth="3" />
          <circle cx="78" cy="20" r="2" fill={a} stroke="none" />
          <line x1="36" y1="34" x2="32" y2="58" />
          <line x1="46" y1="60" x2="38" y2="92" />
          <line x1="46" y1="60" x2="54" y2="92" />
        </svg>
      );

    case 'cat-cow':
      return (
        <svg {...props}>
          {floor}
          {head(82, 50)}
          <path d="M 78 52 Q 60 35 30 48" stroke={a} strokeWidth="3.2" />
          <line x1="30" y1="48" x2="22" y2="78" />
          <line x1="32" y1="50" x2="32" y2="78" />
          <line x1="58" y1="42" x2="58" y2="78" />
          <line x1="70" y1="46" x2="70" y2="78" />
        </svg>
      );

    case 'thread-needle':
      return (
        <svg {...props}>
          {floor}
          {head(78, 60)}
          <path d="M 74 58 L 50 70 L 30 60" stroke={a} strokeWidth="3.2" />
          <line x1="68" y1="60" x2="68" y2="78" />
          <line x1="58" y1="62" x2="58" y2="78" />
          <line x1="50" y1="70" x2="42" y2="78" />
          <line x1="74" y1="56" x2="80" y2="46" />
        </svg>
      );

    case 'wall-angel':
      return (
        <svg {...props}>
          {wall(28)}
          {floor}
          {head(34, 22)}
          <line x1="34" y1="28" x2="34" y2="62" />
          <path d="M 34 34 Q 50 30 56 18" stroke={a} strokeWidth="3" />
          <path d="M 34 42 Q 52 44 60 36" stroke={a} strokeWidth="3" />
          <line x1="34" y1="62" x2="30" y2="92" />
          <line x1="34" y1="62" x2="42" y2="92" />
        </svg>
      );

    case 'sphinx':
      return (
        <svg {...props}>
          {floor}
          {head(28, 38)}
          <path d="M 32 42 Q 44 50 60 56 L 88 60" stroke={a} strokeWidth="3.2" />
          <line x1="28" y1="44" x2="22" y2="70" />
          <line x1="28" y1="60" x2="22" y2="70" />
          <line x1="60" y1="56" x2="60" y2="72" />
          <line x1="88" y1="60" x2="86" y2="72" />
        </svg>
      );

    case 'cobra':
      return (
        <svg {...props}>
          {floor}
          {head(24, 30)}
          <path d="M 26 35 Q 38 50 56 60 L 86 64" stroke={a} strokeWidth="3.2" />
          <line x1="24" y1="36" x2="20" y2="62" />
          <line x1="24" y1="48" x2="20" y2="62" />
          <line x1="56" y1="60" x2="58" y2="74" />
          <line x1="86" y1="64" x2="86" y2="74" />
        </svg>
      );

    case 'deep-squat':
      return (
        <svg {...props}>
          {floor}
          {head(50, 22)}
          <line x1="50" y1="28" x2="50" y2="56" stroke={a} strokeWidth="3" />
          <path d="M 50 56 L 32 60 L 32 88" />
          <path d="M 50 56 L 68 60 L 68 88" />
          <line x1="50" y1="38" x2="40" y2="50" />
          <line x1="50" y1="38" x2="60" y2="50" />
        </svg>
      );

    case 'pigeon':
      return (
        <svg {...props}>
          {floor}
          {head(30, 30)}
          <path d="M 32 36 Q 45 50 60 60" />
          <path d="M 30 60 Q 50 56 70 64" stroke={a} strokeWidth="3.2" />
          <path d="M 30 64 L 60 80 L 88 76" stroke={a} strokeWidth="3" />
          <line x1="60" y1="80" x2="60" y2="88" />
        </svg>
      );

    case 'low-lunge':
      return (
        <svg {...props}>
          {floor}
          {head(52, 18)}
          <line x1="52" y1="24" x2="52" y2="56" />
          <path d="M 52 56 L 30 70 L 22 88" stroke={a} strokeWidth="3" />
          <path d="M 52 56 L 68 78 L 80 78 L 80 90" />
          <line x1="42" y1="32" x2="32" y2="48" />
          <line x1="62" y1="32" x2="72" y2="48" />
        </svg>
      );

    case 'butterfly':
      return (
        <svg {...props}>
          {floor}
          {head(50, 22)}
          <line x1="50" y1="28" x2="50" y2="60" />
          <line x1="50" y1="60" x2="30" y2="76" stroke={a} strokeWidth="3.2" />
          <line x1="50" y1="60" x2="70" y2="76" stroke={a} strokeWidth="3.2" />
          <path d="M 30 76 L 50 88 L 70 76" stroke={a} strokeWidth="3.2" />
          <line x1="42" y1="34" x2="34" y2="58" />
          <line x1="58" y1="34" x2="66" y2="58" />
        </svg>
      );

    case 'fig4':
      return (
        <svg {...props}>
          {floor}
          {head(20, 50)}
          <line x1="24" y1="50" x2="58" y2="50" />
          <path d="M 58 50 L 54 70 L 70 80" stroke={a} strokeWidth="3" />
          <path d="M 58 50 L 66 64 L 78 56" stroke={a} strokeWidth="3" />
          <line x1="32" y1="46" x2="40" y2="38" />
        </svg>
      );

    case 'standing-quad':
      return (
        <svg {...props}>
          {floor}
          {head(50, 18)}
          <line x1="50" y1="24" x2="50" y2="56" />
          <line x1="40" y1="30" x2="60" y2="30" />
          <line x1="40" y1="30" x2="34" y2="48" />
          <path d="M 60 30 Q 70 50 60 64" stroke={a} strokeWidth="3" />
          <path d="M 50 56 L 45 78 L 60 64" stroke={a} strokeWidth="3" />
          <line x1="50" y1="56" x2="50" y2="92" />
        </svg>
      );

    case 'seated-fold':
      return (
        <svg {...props}>
          {floor}
          {head(28, 50)}
          <path d="M 30 56 Q 45 70 60 78 L 88 78" stroke={a} strokeWidth="3.2" />
          <path d="M 30 54 L 50 64" />
          <path d="M 30 56 L 50 70" />
        </svg>
      );

    case 'pancake':
      return (
        <svg {...props}>
          {floor}
          {head(50, 38)}
          <path d="M 50 44 L 50 70" stroke={a} strokeWidth="3.2" />
          <line x1="50" y1="50" x2="20" y2="84" stroke={a} strokeWidth="3" />
          <line x1="50" y1="50" x2="80" y2="84" stroke={a} strokeWidth="3" />
          <line x1="42" y1="48" x2="32" y2="68" />
          <line x1="58" y1="48" x2="68" y2="68" />
        </svg>
      );

    case 'couch-stretch':
      return (
        <svg {...props}>
          {wall(82)}
          {floor}
          {head(50, 24)}
          <line x1="50" y1="30" x2="50" y2="56" />
          <line x1="42" y1="36" x2="38" y2="56" />
          <line x1="58" y1="36" x2="62" y2="56" />
          <path d="M 50 56 L 32 70 L 24 88" />
          <path d="M 50 56 L 70 66 L 80 50" stroke={a} strokeWidth="3.2" />
          <line x1="80" y1="50" x2="82" y2="35" stroke={a} strokeWidth="3" />
        </svg>
      );

    case 'wall-calf':
      return (
        <svg {...props}>
          {wall(20)}
          {floor}
          {head(38, 26)}
          <line x1="38" y1="32" x2="42" y2="58" />
          <line x1="32" y1="38" x2="22" y2="40" />
          <line x1="44" y1="38" x2="34" y2="44" />
          <path d="M 42 58 L 26 86" stroke={a} strokeWidth="3.2" />
          <path d="M 42 58 L 70 88" stroke={a} strokeWidth="3" />
        </svg>
      );

    case 'wall-calf-bent':
      return (
        <svg {...props}>
          {wall(20)}
          {floor}
          {head(38, 26)}
          <line x1="38" y1="32" x2="42" y2="58" />
          <line x1="32" y1="38" x2="22" y2="42" />
          <line x1="44" y1="38" x2="34" y2="46" />
          <path d="M 42 58 L 30 76 L 28 88" stroke={a} strokeWidth="3.2" />
          <path d="M 42 58 L 66 84" stroke={a} strokeWidth="3" />
        </svg>
      );

    case 'ankle-circle':
      return (
        <svg {...props}>
          {floor}
          {head(50, 24)}
          <line x1="50" y1="30" x2="50" y2="56" />
          <line x1="40" y1="34" x2="60" y2="34" />
          <line x1="40" y1="34" x2="34" y2="55" />
          <line x1="60" y1="34" x2="66" y2="55" />
          <line x1="50" y1="56" x2="42" y2="92" />
          <path d="M 50 56 L 60 78" />
          <ellipse cx="68" cy="84" rx="10" ry="4" stroke={a} strokeWidth="2.5" strokeDasharray="2 2" />
          <circle cx="58" cy="84" r="2" fill={a} stroke="none" />
        </svg>
      );

    case 'ankle-lunge':
      return (
        <svg {...props}>
          {floor}
          {head(46, 22)}
          <line x1="46" y1="28" x2="46" y2="56" />
          <path d="M 46 56 L 64 80 L 78 80" stroke={a} strokeWidth="3.2" />
          <line x1="46" y1="56" x2="30" y2="88" />
          <line x1="38" y1="34" x2="32" y2="50" />
          <line x1="54" y1="34" x2="60" y2="48" />
        </svg>
      );

    case 'child':
      return (
        <svg {...props}>
          {floor}
          {head(28, 70)}
          <path d="M 32 70 Q 50 64 70 78" stroke={a} strokeWidth="3.2" />
          <line x1="32" y1="68" x2="22" y2="56" />
          <line x1="38" y1="68" x2="20" y2="60" />
          <line x1="60" y1="74" x2="62" y2="86" />
          <line x1="70" y1="78" x2="72" y2="86" />
        </svg>
      );

    case 'knee-chest':
      return (
        <svg {...props}>
          {floor}
          {head(20, 70)}
          <line x1="24" y1="70" x2="60" y2="70" />
          <path d="M 50 70 L 56 50 L 70 56" stroke={a} strokeWidth="3" />
          <line x1="60" y1="70" x2="88" y2="74" />
          <path d="M 38 64 L 56 50" />
          <path d="M 42 68 L 56 50" />
        </svg>
      );

    case 'supine-twist':
      return (
        <svg {...props}>
          {floor}
          {head(20, 64)}
          <line x1="24" y1="64" x2="60" y2="64" />
          <path d="M 50 64 Q 56 50 76 50" stroke={a} strokeWidth="3.2" />
          <path d="M 60 64 L 88 70" />
          <line x1="34" y1="60" x2="20" y2="50" />
          <line x1="34" y1="68" x2="20" y2="78" />
        </svg>
      );

    case 'wrist-flex':
      return (
        <svg {...props}>
          {floor}
          {head(40, 36)}
          <path d="M 44 40 L 70 50 L 88 70" />
          <line x1="42" y1="44" x2="42" y2="70" />
          <line x1="62" y1="48" x2="62" y2="72" />
          <path d="M 88 70 L 82 80" stroke={a} strokeWidth="3.2" />
          <circle cx="88" cy="70" r="3" fill={a} stroke="none" />
        </svg>
      );

    case 'wrist-extend':
      return (
        <svg {...props}>
          {floor}
          {head(40, 36)}
          <path d="M 44 40 L 70 50 L 88 70" />
          <line x1="42" y1="44" x2="42" y2="70" />
          <line x1="62" y1="48" x2="62" y2="72" />
          <path d="M 88 70 L 82 60" stroke={a} strokeWidth="3.2" />
          <circle cx="88" cy="70" r="3" fill={a} stroke="none" />
        </svg>
      );

    case 'wrist-circle':
      return (
        <svg {...props}>
          {floor}
          {head(50, 22)}
          <line x1="50" y1="28" x2="50" y2="58" />
          <path d="M 40 32 L 50 48 L 60 32" />
          <circle cx="50" cy="48" r="8" fill="none" stroke={a} strokeWidth="2.5" strokeDasharray="2 2" />
          <line x1="50" y1="58" x2="42" y2="92" />
          <line x1="50" y1="58" x2="58" y2="92" />
        </svg>
      );

    case 'prayer':
      return (
        <svg {...props}>
          {floor}
          {head(50, 22)}
          <line x1="50" y1="28" x2="50" y2="58" />
          <path d="M 40 32 L 50 50 L 60 32" stroke={a} strokeWidth="3" />
          <path d="M 50 38 L 50 50" stroke={a} strokeWidth="3" />
          <line x1="50" y1="58" x2="42" y2="92" />
          <line x1="50" y1="58" x2="58" y2="92" />
        </svg>
      );

    default:
      return (
        <svg {...props}>
          {floor}
          {head(50, 22)}
          <line x1="50" y1="28" x2="50" y2="58" />
          <line x1="40" y1="34" x2="60" y2="34" />
          <line x1="40" y1="34" x2="34" y2="56" />
          <line x1="60" y1="34" x2="66" y2="56" />
          <line x1="50" y1="58" x2="42" y2="92" />
          <line x1="50" y1="58" x2="58" y2="92" />
        </svg>
      );
  }
};

// ====================================================================
// EXERCISE DATA
// ====================================================================

const muscleGroups = [
  {
    id: 'neck', name: 'Nacken & Schultern', short: 'Nacken',
    tag: 'Mobilität', color: '#FF6B35',
    desc: 'Bildschirm-Verspannungen lösen',
    exercises: [
      { name: 'Nackendehnung seitlich', duration: 30, side: 'beidseitig', pose: 'neck-tilt',
        desc: 'Kopf langsam zur Schulter neigen, mit der Hand sanften Druck geben. Gegenüberliegende Schulter aktiv nach unten ziehen.' },
      { name: 'Schulterkreisen rückwärts', duration: 45, pose: 'shoulder-rolls',
        desc: 'Große, langsame Kreise rückwärts. Schulterblätter zusammen und nach unten führen.' },
      { name: 'Trapezius-Dehnung', duration: 30, side: 'beidseitig', pose: 'trap-stretch',
        desc: 'Eine Hand hinter den Rücken, Kopf zur gegenüberliegenden Seite und leicht nach vorne neigen.' },
      { name: 'Türrahmen Brustöffner', duration: 45, side: 'beidseitig', pose: 'door-chest',
        desc: 'Unterarm vertikal an Türrahmen, einen Schritt nach vorne. Brust öffnet sich, vordere Schulter dehnt.' },
    ],
  },
  {
    id: 'chest', name: 'Brust & oberer Rücken', short: 'Brust',
    tag: 'Öffnung', color: '#4ECDC4',
    desc: 'Anti-Rundrücken-Routine',
    exercises: [
      { name: 'Katze-Kuh', duration: 60, pose: 'cat-cow',
        desc: 'Vierfüßlerstand. Im Wechsel Rücken nach oben runden und nach unten fallen lassen. Atem mitführen.' },
      { name: 'Brustkorb-Twist (Thread the Needle)', duration: 45, side: 'beidseitig', pose: 'thread-needle',
        desc: 'Vierfüßlerstand. Einen Arm unter dem Körper hindurchführen, Schulter zum Boden. Brustwirbelsäule rotieren.' },
      { name: 'Wand-Engel', duration: 45, pose: 'wall-angel',
        desc: 'Mit Rücken an der Wand. Arme an die Wand, langsam hoch und runter führen. Kontakt halten.' },
      { name: 'Sphinx', duration: 60, pose: 'sphinx',
        desc: 'Bauchlage, Unterarme aufgestellt. Brust öffnen, Schulterblätter nach unten ziehen. Schultern weg von den Ohren.' },
    ],
  },
  {
    id: 'hips', name: 'Hüfte & Gesäß', short: 'Hüfte',
    tag: 'Tiefe', color: '#FFD23F',
    desc: 'Sitzschäden reparieren',
    exercises: [
      { name: 'Tiefe Kniebeuge halten', duration: 60, pose: 'deep-squat',
        desc: 'Tiefer Squat, Füße schulterbreit, Fersen am Boden. Ellbogen drücken Knie sanft nach außen.' },
      { name: 'Tauben-Pose', duration: 90, side: 'beidseitig', pose: 'pigeon',
        desc: 'Vorderes Bein angewinkelt vor dem Körper, hinteres Bein lang gestreckt. Oberkörper über das vordere Bein senken.' },
      { name: 'Hüftbeuger-Lunge', duration: 60, side: 'beidseitig', pose: 'low-lunge',
        desc: 'Tiefer Ausfallschritt, hinteres Knie am Boden. Becken nach vorne kippen, Po anspannen. Front der hinteren Hüfte spüren.' },
      { name: 'Schmetterling', duration: 60, pose: 'butterfly',
        desc: 'Sitzend, Fußsohlen aneinander, Knie sinken zur Seite. Mit geradem Rücken nach vorne neigen.' },
      { name: 'Liegende Figur 4', duration: 60, side: 'beidseitig', pose: 'fig4',
        desc: 'Auf dem Rücken. Knöchel auf gegenüberliegendes Knie. Hände hinter Oberschenkel, sanft zur Brust ziehen.' },
    ],
  },
  {
    id: 'legs', name: 'Oberschenkel', short: 'Beine',
    tag: 'Kraft & Länge', color: '#95E1D3',
    desc: 'Quads & Hamstrings',
    exercises: [
      { name: 'Stehende Quad-Dehnung', duration: 45, side: 'beidseitig', pose: 'standing-quad',
        desc: 'Knöchel hinter den Po führen, Hand greift Fuß. Knie zeigen nach unten, Becken nach vorne.' },
      { name: 'Sitzende Vorbeuge', duration: 60, pose: 'seated-fold',
        desc: 'Beine gestreckt vor dir. Mit geradem Rücken über die Beine vorbeugen. Hamstrings sollen ziehen, nicht der untere Rücken.' },
      { name: 'Pancake-Dehnung', duration: 60, pose: 'pancake',
        desc: 'Beine weit grätschen, sitzend. Hände vor dir am Boden, Brust nach unten zur Mitte. Innenseite Oberschenkel & Hamstrings.' },
      { name: 'Couch-Stretch', duration: 90, side: 'beidseitig', pose: 'couch-stretch',
        desc: 'Hinteres Knie an die Wand/Couch, Schienbein hoch. Vorderer Fuß im Lunge. Po anspannen, Becken aufrichten.' },
    ],
  },
  {
    id: 'calves', name: 'Waden & Knöchel', short: 'Waden',
    tag: 'Fundament', color: '#FF8FA3',
    desc: 'Sprung & Squat-Tiefe',
    exercises: [
      { name: 'Wand-Wadendehnung', duration: 45, side: 'beidseitig', pose: 'wall-calf',
        desc: 'Hände an die Wand, ein Bein gestreckt nach hinten. Ferse am Boden. Hintere Wade dehnt sich.' },
      { name: 'Knöchelkreisen', duration: 30, side: 'beidseitig', pose: 'ankle-circle',
        desc: 'Großzügige, langsame Kreise mit dem Fußgelenk. Erst eine Richtung, dann die andere.' },
      { name: 'Soleus-Dehnung (Knie gebeugt)', duration: 45, side: 'beidseitig', pose: 'wall-calf-bent',
        desc: 'Wie Wadendehnung, aber hinteres Knie leicht gebeugt. Trifft den tieferen Wadenmuskel.' },
      { name: 'Tiefer Knöchel-Lunge', duration: 45, side: 'beidseitig', pose: 'ankle-lunge',
        desc: 'Lunge mit vorderer Ferse fest am Boden. Knie über die Zehen schieben, ohne dass die Ferse hochkommt.' },
    ],
  },
  {
    id: 'back', name: 'Unterer Rücken', short: 'Rücken',
    tag: 'Reset', color: '#C77DFF',
    desc: 'Nach Heavy-Days unverzichtbar',
    exercises: [
      { name: 'Kindhaltung', duration: 90, pose: 'child',
        desc: 'Knie weit, große Zehen aneinander. Po Richtung Fersen, Arme nach vorne lang. Atme in den Rücken.' },
      { name: 'Cobra', duration: 45, pose: 'cobra',
        desc: 'Bauchlage, Hände unter den Schultern. Brust hochdrücken, Hüfte bleibt am Boden. Keine Schmerzen im unteren Rücken.' },
      { name: 'Knie zur Brust', duration: 45, side: 'beidseitig', pose: 'knee-chest',
        desc: 'Auf dem Rücken. Ein Knie zur Brust ziehen, anderes Bein gestreckt am Boden. Becken bleibt neutral.' },
      { name: 'Liegender Twist', duration: 60, side: 'beidseitig', pose: 'supine-twist',
        desc: 'Auf dem Rücken, ein Knie zur Brust und über den Körper zur gegenüberliegenden Seite. Schultern bleiben am Boden.' },
    ],
  },
  {
    id: 'wrists', name: 'Handgelenke', short: 'Handgelenke',
    tag: 'Pre-Workout', color: '#80FFDB',
    desc: 'Vor Front Squats & Push-ups',
    exercises: [
      { name: 'Handgelenk-Beugung am Boden', duration: 30, pose: 'wrist-flex',
        desc: 'Vierfüßlerstand. Handflächen am Boden, Finger zeigen zu den Knien. Sanft nach hinten lehnen.' },
      { name: 'Handgelenk-Streckung am Boden', duration: 30, pose: 'wrist-extend',
        desc: 'Vierfüßlerstand. Handrücken am Boden, Finger zeigen zu den Knien. Vorsichtig Druck aufbauen.' },
      { name: 'Handgelenkkreisen', duration: 30, pose: 'wrist-circle',
        desc: 'Hände gefaltet vor der Brust. Große, langsame Kreise mit beiden Handgelenken in beide Richtungen.' },
      { name: 'Gebets-Dehnung', duration: 45, pose: 'prayer',
        desc: 'Handflächen vor der Brust aneinander, Ellbogen heben. Hände bleiben zusammen, Druck nach unten.' },
    ],
  },
  {
    id: 'full', name: 'Ganzkörper Quick', short: 'Quick',
    tag: 'Daily', color: '#D4FF00',
    desc: 'Wenn die Zeit knapp ist',
    exercises: [
      { name: 'Katze-Kuh', duration: 45, pose: 'cat-cow',
        desc: 'Vierfüßlerstand. Im Wechsel Rücken runden und durchhängen lassen. Tief atmen.' },
      { name: 'Tiefe Kniebeuge halten', duration: 45, pose: 'deep-squat',
        desc: 'Tiefer Squat, Fersen am Boden. Ellbogen schieben Knie nach außen.' },
      { name: 'Hüftbeuger-Lunge', duration: 45, side: 'beidseitig', pose: 'low-lunge',
        desc: 'Hinteres Knie am Boden, Becken nach vorne kippen. Po anspannen.' },
      { name: 'Couch-Stretch', duration: 60, side: 'beidseitig', pose: 'couch-stretch',
        desc: 'Schienbein an die Wand, vorderer Fuß im Lunge. Becken aufrichten.' },
      { name: 'Türrahmen Brustöffner', duration: 30, side: 'beidseitig', pose: 'door-chest',
        desc: 'Unterarm an Türrahmen, einen Schritt nach vorne. Brust öffnet.' },
      { name: 'Liegender Twist', duration: 45, side: 'beidseitig', pose: 'supine-twist',
        desc: 'Knie über den Körper rotieren, Schultern bleiben am Boden.' },
    ],
  },
];

// ====================================================================
// HELPERS
// ====================================================================

function expandExercises(exercises) {
  const out = [];
  for (const ex of exercises) {
    if (ex.side === 'beidseitig') {
      out.push({ ...ex, sideLabel: 'LINKS' });
      out.push({ ...ex, sideLabel: 'RECHTS' });
    } else {
      out.push({ ...ex, sideLabel: null });
    }
  }
  return out;
}

function getAllExercisesFlat() {
  const out = [];
  const seen = new Set();
  for (const g of muscleGroups) {
    for (const ex of g.exercises) {
      const key = ex.name;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({
        ...ex,
        groupId: g.id,
        groupName: g.short,
        groupColor: g.color,
      });
    }
  }
  return out;
}

function playBeep(freq = 880, duration = 180, volume = 0.25) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration / 1000 + 0.05);
    setTimeout(() => ctx.close(), duration + 200);
  } catch (e) {}
}

// ====================================================================
// HOME SCREEN
// ====================================================================

function HomeScreen({ onSelectGroup, onFreeTraining }) {
  const greet = (() => {
    const h = new Date().getHours();
    if (h < 11) return 'Guten Morgen';
    if (h < 17) return 'Hey, weiter geht\u2019s';
    return 'Guten Abend';
  })();

  const totalGroups = muscleGroups.length;
  const totalExercises = getAllExercisesFlat().length;

  return (
    <div className="px-6 pt-10 pb-24">
      <div className="flex items-center justify-between mb-2">
        <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.18em', color: '#666' }}>
          {greet.toUpperCase()}
        </span>
        <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.18em', color: '#D4FF00' }}>
          DAY 1
        </span>
      </div>

      <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: 64, lineHeight: 0.92, color: '#fafafa', letterSpacing: '-0.01em' }}>
        FLEX
      </h1>
      <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 15, color: '#999', marginTop: 6, lineHeight: 1.4 }}>
        Wähle deine Muskelgruppe.<br />Dehne. Atme. Bewege dich besser.
      </p>

      <div className="flex gap-3 mt-7 mb-7">
        <div className="flex-1 rounded-2xl px-4 py-3" style={{ background: '#161616', border: '1px solid #222' }}>
          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 32, color: '#fafafa', lineHeight: 1 }}>{totalGroups}</div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: '#777', letterSpacing: '0.12em', marginTop: 4 }}>GRUPPEN</div>
        </div>
        <div className="flex-1 rounded-2xl px-4 py-3" style={{ background: '#161616', border: '1px solid #222' }}>
          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 32, color: '#fafafa', lineHeight: 1 }}>{totalExercises}</div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: '#777', letterSpacing: '0.12em', marginTop: 4 }}>ÜBUNGEN</div>
        </div>
        <div className="flex-1 rounded-2xl px-4 py-3 flex flex-col justify-between" style={{ background: '#D4FF00' }}>
          <Flame size={20} color="#0a0a0a" />
          <div>
            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 14, color: '#0a0a0a', lineHeight: 1, letterSpacing: '0.05em' }}>READY</div>
          </div>
        </div>
      </div>

      <button
        onClick={onFreeTraining}
        className="w-full rounded-2xl text-left active:scale-95 transition-transform mb-8 relative overflow-hidden"
        style={{
          background: '#fafafa',
          padding: '18px 18px',
          display: 'flex', alignItems: 'center', gap: 16,
        }}
      >
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: '#0a0a0a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Shuffle size={26} color="#D4FF00" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: '#666' }}>
            INDIVIDUELL
          </div>
          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 22, color: '#0a0a0a', lineHeight: 1.05, letterSpacing: '0.01em' }}>
            FREIES TRAINING
          </div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#666', marginTop: 4 }}>
            Übungen suchen, mischen, eigene Session bauen
          </div>
        </div>
        <ChevronRight size={20} color="#0a0a0a" />
      </button>

      <div className="flex items-baseline justify-between mb-4">
        <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 22, color: '#fafafa', letterSpacing: '0.02em' }}>
          MUSKELGRUPPEN
        </h2>
        <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: '#666', letterSpacing: '0.18em' }}>
          {String(totalGroups).padStart(2, '0')}
        </span>
      </div>

      <div className="space-y-3">
        {muscleGroups.map((g) => {
          const exs = expandExercises(g.exercises);
          const minutes = Math.round(exs.reduce((s, e) => s + e.duration, 0) / 60);
          return (
            <button
              key={g.id}
              onClick={() => onSelectGroup(g)}
              className="w-full rounded-2xl text-left transition-all active:scale-95"
              style={{
                background: '#141414', border: '1px solid #222',
                padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: 14,
              }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: 14,
                background: '#0a0a0a', border: `1px solid ${g.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Pose name={g.exercises[0].pose} color="#fafafa" accent={g.color} size={56} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: g.color }}>
                    {g.tag.toUpperCase()}
                  </span>
                </div>
                <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 21, color: '#fafafa', lineHeight: 1.05, letterSpacing: '0.01em' }}>
                  {g.name.toUpperCase()}
                </div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#777', marginTop: 4, display: 'flex', gap: 10 }}>
                  <span>{exs.length} Übungen</span>
                  <span style={{ color: '#444' }}>•</span>
                  <span>~{minutes} Min</span>
                </div>
              </div>
              <ChevronRight size={20} color="#444" />
            </button>
          );
        })}
      </div>

      <div className="mt-10 text-center" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: '#444', letterSpacing: '0.15em' }}>
        FLEX · MOBILITY DAILY
      </div>
    </div>
  );
}

// ====================================================================
// GROUP DETAIL — with selectable exercises
// ====================================================================

function GroupScreen({ group, onStart, onBack }) {
  const [selected, setSelected] = useState(() => new Set(group.exercises.map((_, i) => i)));

  const toggle = (i) => {
    const next = new Set(selected);
    if (next.has(i)) next.delete(i); else next.add(i);
    setSelected(next);
  };
  const allOn = selected.size === group.exercises.length;
  const toggleAll = () => {
    if (allOn) setSelected(new Set());
    else setSelected(new Set(group.exercises.map((_, i) => i)));
  };

  const selectedExercises = useMemo(() => {
    const list = group.exercises.filter((_, i) => selected.has(i));
    return expandExercises(list);
  }, [selected, group]);

  const totalMin = Math.round(selectedExercises.reduce((s, e) => s + e.duration, 0) / 60);

  const handleStart = () => {
    if (selectedExercises.length === 0) return;
    onStart(selectedExercises, { color: group.color, tag: group.tag, short: group.short });
  };

  return (
    <div className="pb-32">
      <div className="relative" style={{ background: group.color, padding: '20px 24px 28px' }}>
        <button
          onClick={onBack}
          className="rounded-full active:scale-95 transition-transform"
          style={{
            width: 40, height: 40, background: 'rgba(0,0,0,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ChevronLeft size={22} color="#0a0a0a" />
        </button>

        <div className="mt-6 flex items-center gap-4">
          <div style={{
            width: 88, height: 88, borderRadius: 18,
            background: 'rgba(0,0,0,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Pose name={group.exercises[0].pose} color="#0a0a0a" accent="#0a0a0a" size={76} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: '#0a0a0a', opacity: 0.7 }}>
              {group.tag.toUpperCase()} · ROUTINE
            </div>
            <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: 34, color: '#0a0a0a', lineHeight: 0.95, marginTop: 6, letterSpacing: '-0.005em' }}>
              {group.name.toUpperCase()}
            </h1>
          </div>
        </div>

        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: '#0a0a0a', opacity: 0.8, marginTop: 12, fontWeight: 500 }}>
          {group.desc}
        </p>
      </div>

      <div className="px-6 pt-6 pb-3 flex items-baseline justify-between">
        <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 18, color: '#fafafa', letterSpacing: '0.05em' }}>
          ÜBUNGEN AUSWÄHLEN
        </h2>
        <button
          onClick={toggleAll}
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
            color: group.color, padding: '4px 0',
          }}
        >
          {allOn ? 'KEINE' : 'ALLE'}
        </button>
      </div>

      <div className="px-6 space-y-2">
        {group.exercises.map((ex, i) => {
          const isOn = selected.has(i);
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              className="w-full rounded-xl text-left transition-all flex items-center gap-3"
              style={{
                background: isOn ? '#181818' : '#0f0f0f',
                border: `1px solid ${isOn ? group.color + '40' : '#1a1a1a'}`,
                padding: '12px 14px',
                opacity: isOn ? 1 : 0.5,
              }}
            >
              <div style={{
                width: 50, height: 50, borderRadius: 10,
                background: '#0a0a0a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Pose name={ex.pose} color="#fafafa" accent={group.color} size={44} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, fontWeight: 700, color: '#fafafa', lineHeight: 1.3 }}>
                  {ex.name}
                </div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: '#777', marginTop: 3, display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Clock size={11} />
                  <span>{ex.duration}s {ex.side === 'beidseitig' && '· beidseitig'}</span>
                </div>
              </div>
              <div style={{
                width: 26, height: 26, borderRadius: 8,
                background: isOn ? group.color : 'transparent',
                border: `1.5px solid ${isOn ? group.color : '#333'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {isOn && <Check size={16} color="#0a0a0a" strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>

      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full px-6 pb-6 pt-4"
        style={{
          maxWidth: 460,
          background: 'linear-gradient(to top, #0a0a0a 70%, rgba(10,10,10,0))',
        }}
      >
        <div className="flex items-center justify-between mb-2 px-1">
          <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: '#888', letterSpacing: '0.15em' }}>
            {selectedExercises.length} EINHEITEN · ~{totalMin} MIN
          </span>
        </div>
        <button
          onClick={handleStart}
          disabled={selectedExercises.length === 0}
          className="w-full rounded-2xl active:scale-95 transition-transform"
          style={{
            background: selectedExercises.length === 0 ? '#222' : '#D4FF00',
            color: selectedExercises.length === 0 ? '#555' : '#0a0a0a',
            padding: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            fontFamily: 'Anton, sans-serif',
            fontSize: 22,
            letterSpacing: '0.08em',
          }}
        >
          <Play size={20} fill={selectedExercises.length === 0 ? '#555' : '#0a0a0a'} />
          SESSION STARTEN
        </button>
      </div>
    </div>
  );
}

// ====================================================================
// FREE TRAINING — search and pick exercises
// ====================================================================

function FreeTrainingScreen({ onStart, onBack }) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [picked, setPicked] = useState([]);

  const allExercises = useMemo(() => getAllExercisesFlat(), []);

  const filtered = useMemo(() => {
    let list = allExercises;
    if (activeFilter) list = list.filter((e) => e.groupId === activeFilter);
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter((e) =>
        e.name.toLowerCase().includes(q) ||
        e.groupName.toLowerCase().includes(q) ||
        e.desc.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allExercises, activeFilter, query]);

  const isPicked = (ex) => picked.some((p) => p.name === ex.name);

  const togglePick = (ex) => {
    if (isPicked(ex)) {
      setPicked(picked.filter((p) => p.name !== ex.name));
    } else {
      setPicked([...picked, ex]);
    }
  };

  const handleStart = () => {
    if (picked.length === 0) return;
    const expanded = expandExercises(picked);
    onStart(expanded, { color: '#D4FF00', tag: 'Custom', short: 'Mein Mix' });
  };

  const totalSec = picked.reduce((s, e) => {
    return s + (e.side === 'beidseitig' ? e.duration * 2 : e.duration);
  }, 0);

  return (
    <div className="pb-40">
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="rounded-full active:scale-95 transition-transform"
            style={{
              width: 40, height: 40, background: '#1a1a1a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ChevronLeft size={22} color="#fafafa" />
          </button>
          <div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: '#666' }}>
              INDIVIDUELL
            </div>
            <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: 28, color: '#fafafa', lineHeight: 1, letterSpacing: '0.01em', marginTop: 2 }}>
              FREIES TRAINING
            </h1>
          </div>
        </div>

        <div
          className="rounded-2xl flex items-center gap-3 px-4"
          style={{ background: '#161616', border: '1px solid #222', height: 50 }}
        >
          <Search size={18} color="#666" />
          <input
            type="text"
            placeholder="Übung suchen…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 15,
              color: '#fafafa',
              border: 'none',
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="active:scale-90 transition-transform">
              <X size={18} color="#666" />
            </button>
          )}
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <button
            onClick={() => setActiveFilter(null)}
            className="rounded-full active:scale-95 transition-transform whitespace-nowrap"
            style={{
              background: activeFilter === null ? '#fafafa' : '#161616',
              color: activeFilter === null ? '#0a0a0a' : '#999',
              border: '1px solid #222',
              padding: '7px 14px',
              fontFamily: 'Manrope, sans-serif',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.05em',
              flexShrink: 0,
            }}
          >
            ALLE
          </button>
          {muscleGroups.map((g) => {
            const on = activeFilter === g.id;
            return (
              <button
                key={g.id}
                onClick={() => setActiveFilter(on ? null : g.id)}
                className="rounded-full active:scale-95 transition-transform whitespace-nowrap"
                style={{
                  background: on ? g.color : '#161616',
                  color: on ? '#0a0a0a' : '#999',
                  border: `1px solid ${on ? g.color : '#222'}`,
                  padding: '7px 14px',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  flexShrink: 0,
                }}
              >
                {g.short.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6 pb-3 flex items-center justify-between">
        <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: '#666', letterSpacing: '0.15em' }}>
          {filtered.length} ÜBUNG{filtered.length !== 1 ? 'EN' : ''}
        </span>
      </div>

      <div className="px-6 space-y-2">
        {filtered.length === 0 && (
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: '#141414', border: '1px solid #222' }}
          >
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, color: '#666' }}>
              Keine Übung gefunden.
            </div>
          </div>
        )}
        {filtered.map((ex) => {
          const on = isPicked(ex);
          return (
            <button
              key={ex.name}
              onClick={() => togglePick(ex)}
              className="w-full rounded-xl text-left transition-all flex items-center gap-3"
              style={{
                background: on ? '#181818' : '#0f0f0f',
                border: `1px solid ${on ? ex.groupColor + '60' : '#1a1a1a'}`,
                padding: '12px 14px',
              }}
            >
              <div style={{
                width: 50, height: 50, borderRadius: 10,
                background: '#0a0a0a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Pose name={ex.pose} color="#fafafa" accent={ex.groupColor} size={44} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 14, fontWeight: 700, color: '#fafafa', lineHeight: 1.3 }}>
                  {ex.name}
                </div>
                <div className="flex items-center gap-2 mt-1" style={{ flexWrap: 'wrap' }}>
                  <span style={{
                    background: ex.groupColor + '20',
                    color: ex.groupColor,
                    padding: '2px 8px',
                    borderRadius: 999,
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                  }}>
                    {ex.groupName.toUpperCase()}
                  </span>
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: '#777' }}>
                    {ex.duration}s {ex.side === 'beidseitig' && '· 2x'}
                  </span>
                </div>
              </div>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: on ? ex.groupColor : 'transparent',
                border: `1.5px solid ${on ? ex.groupColor : '#333'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {on
                  ? <Check size={18} color="#0a0a0a" strokeWidth={3} />
                  : <Plus size={18} color="#666" />}
              </div>
            </button>
          );
        })}
      </div>

      {picked.length > 0 && (
        <div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full px-6 pb-6 pt-4"
          style={{
            maxWidth: 460,
            background: 'linear-gradient(to top, #0a0a0a 60%, rgba(10,10,10,0.9) 85%, rgba(10,10,10,0))',
          }}
        >
          <div
            className="rounded-2xl mb-3 px-4 py-3 flex items-center gap-3"
            style={{ background: '#161616', border: '1px solid #222' }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 22, color: '#fafafa', lineHeight: 1 }}>
                {picked.length} AUSGEWÄHLT
              </div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: '#888', marginTop: 4, letterSpacing: '0.1em' }}>
                ~{Math.max(1, Math.round(totalSec / 60))} MIN GESAMT
              </div>
            </div>
            <button
              onClick={() => setPicked([])}
              className="rounded-full active:scale-90 transition-transform"
              style={{
                width: 38, height: 38, background: '#0a0a0a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid #2a2a2a',
              }}
            >
              <Trash2 size={16} color="#888" />
            </button>
          </div>
          <button
            onClick={handleStart}
            className="w-full rounded-2xl active:scale-95 transition-transform"
            style={{
              background: '#D4FF00', color: '#0a0a0a',
              padding: '18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              fontFamily: 'Anton, sans-serif',
              fontSize: 22,
              letterSpacing: '0.08em',
            }}
          >
            <Play size={20} fill="#0a0a0a" /> MEIN MIX STARTEN
          </button>
        </div>
      )}
    </div>
  );
}

// ====================================================================
// SESSION (TIMER) SCREEN
// ====================================================================

function SessionScreen({ exercises, theme, onExit, onComplete, soundOn, setSoundOn }) {
  const [idx, setIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercises[0]?.duration || 30);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef(null);

  const current = exercises[idx];
  const total = current?.duration || 1;
  const isLast = idx === exercises.length - 1;

  useEffect(() => {
    if (!running || !current) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (soundOn) playBeep(1100, 250, 0.3);
          queueMicrotask(() => {
            setIdx((cur) => {
              if (cur + 1 >= exercises.length) {
                setRunning(false);
                onComplete();
                return cur;
              }
              return cur + 1;
            });
          });
          return 0;
        }
        if (t <= 4 && t > 1 && soundOn) playBeep(660, 80, 0.15);
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, soundOn, exercises.length, onComplete, current]);

  useEffect(() => {
    if (exercises[idx]) setTimeLeft(exercises[idx].duration);
  }, [idx, exercises]);

  const togglePlay = () => setRunning((r) => !r);
  const skipNext = () => {
    if (isLast) {
      setRunning(false);
      onComplete();
    } else {
      setIdx((i) => i + 1);
    }
  };
  const restart = () => setTimeLeft(current.duration);

  if (!current) return null;

  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? timeLeft / total : 0;
  const dashOffset = circumference * (1 - progress);
  const sessionProgress = (idx + (1 - progress)) / exercises.length;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0a' }}>
      <div className="px-6 pt-8 pb-4 flex items-center justify-between">
        <button
          onClick={onExit}
          className="rounded-full active:scale-95 transition-transform"
          style={{
            width: 40, height: 40, background: '#1a1a1a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <X size={20} color="#fafafa" />
        </button>
        <div className="text-center">
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, letterSpacing: '0.22em', color: '#666' }}>
            {theme.tag.toUpperCase()}
          </div>
          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 16, color: '#fafafa', letterSpacing: '0.05em', marginTop: 2 }}>
            {theme.short.toUpperCase()}
          </div>
        </div>
        <button
          onClick={() => setSoundOn(!soundOn)}
          className="rounded-full active:scale-95 transition-transform"
          style={{
            width: 40, height: 40, background: '#1a1a1a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {soundOn ? <Volume2 size={18} color="#fafafa" /> : <VolumeX size={18} color="#666" />}
        </button>
      </div>

      <div className="px-6">
        <div className="flex items-center justify-between mb-2" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: '#666', letterSpacing: '0.1em' }}>
          <span>ÜBUNG {idx + 1} / {exercises.length}</span>
          <span>{Math.round(sessionProgress * 100)}%</span>
        </div>
        <div style={{ height: 4, background: '#1a1a1a', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${sessionProgress * 100}%`,
            background: theme.color,
            transition: 'width 1s linear',
          }} />
        </div>
      </div>

      <div className="px-6 pt-6 text-center">
        {current.sideLabel && (
          <div style={{
            display: 'inline-block',
            fontFamily: 'Manrope, sans-serif',
            fontSize: 11, fontWeight: 700,
            letterSpacing: '0.25em',
            color: '#0a0a0a',
            background: theme.color,
            padding: '4px 12px',
            borderRadius: 999,
            marginBottom: 10,
          }}>
            {current.sideLabel}
          </div>
        )}
        <h1 style={{
          fontFamily: 'Anton, sans-serif',
          fontSize: 26,
          lineHeight: 1.05,
          color: '#fafafa',
          letterSpacing: '0.01em',
        }}>
          {current.name.toUpperCase()}
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-4">
        <div className="relative" style={{ width: 300, height: 300 }}>
          <svg width="300" height="300" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="150" cy="150" r={radius}
              stroke="#1a1a1a" strokeWidth="10" fill="none"
            />
            <circle
              cx="150" cy="150" r={radius}
              stroke={theme.color}
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Pose name={current.pose} color="#fafafa" accent={theme.color} size={120} />
            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 64, lineHeight: 1, color: '#fafafa', marginTop: 4, letterSpacing: '-0.02em' }}>
              {timeLeft}
            </div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: '#666', marginTop: 2, letterSpacing: '0.15em' }}>
              {running ? 'LÄUFT' : 'PAUSIERT'} · {total}s
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 mb-5">
        <p style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: 13, lineHeight: 1.5, color: '#aaa',
          textAlign: 'center',
        }}>
          {current.desc}
        </p>
      </div>

      <div className="px-6 pb-6 flex items-center justify-center gap-6">
        <button
          onClick={restart}
          className="rounded-full active:scale-90 transition-transform"
          style={{
            width: 56, height: 56, background: '#1a1a1a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <RotateCcw size={22} color="#fafafa" />
        </button>
        <button
          onClick={togglePlay}
          className="rounded-full active:scale-90 transition-transform"
          style={{
            width: 84, height: 84, background: theme.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 8px 30px ${theme.color}40`,
          }}
        >
          {running
            ? <Pause size={32} color="#0a0a0a" fill="#0a0a0a" />
            : <Play size={32} color="#0a0a0a" fill="#0a0a0a" style={{ marginLeft: 4 }} />}
        </button>
        <button
          onClick={skipNext}
          className="rounded-full active:scale-90 transition-transform"
          style={{
            width: 56, height: 56, background: '#1a1a1a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <SkipForward size={22} color="#fafafa" />
        </button>
      </div>

      {idx + 1 < exercises.length && (
        <div className="px-6 pb-6">
          <div className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: '#141414', border: '1px solid #1f1f1f' }}>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: '#666' }}>
              NÄCHSTE
            </div>
            <div style={{ flex: 1, minWidth: 0, fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600, color: '#fafafa', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {exercises[idx + 1].name}
              {exercises[idx + 1].sideLabel && <span style={{ color: theme.color, marginLeft: 6 }}>{exercises[idx + 1].sideLabel}</span>}
            </div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: '#777' }}>
              {exercises[idx + 1].duration}s
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ====================================================================
// COMPLETE SCREEN
// ====================================================================

function CompleteScreen({ theme, exerciseCount, totalSec, onHome }) {
  useEffect(() => {
    setTimeout(() => playBeep(660, 120, 0.2), 0);
    setTimeout(() => playBeep(880, 120, 0.2), 150);
    setTimeout(() => playBeep(1320, 200, 0.25), 300);
  }, []);

  const minutes = Math.max(1, Math.round(totalSec / 60));
  const color = theme?.color || '#D4FF00';

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-12" style={{ background: '#0a0a0a' }}>
      <div />
      <div className="text-center">
        <div
          className="rounded-full mx-auto mb-8 flex items-center justify-center"
          style={{
            width: 120, height: 120,
            background: color,
            boxShadow: `0 12px 60px ${color}40`,
          }}
        >
          <Check size={64} color="#0a0a0a" strokeWidth={3} />
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, letterSpacing: '0.25em', color: '#666' }}>
          SESSION COMPLETE
        </div>
        <h1 style={{
          fontFamily: 'Anton, sans-serif',
          fontSize: 64, lineHeight: 0.95,
          color: '#fafafa',
          marginTop: 12,
          letterSpacing: '-0.01em',
        }}>
          GUT GEMACHT.
        </h1>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: 15, color: '#999', marginTop: 12, lineHeight: 1.5 }}>
          {exerciseCount} Übungen · ~{minutes} Minuten<br />
          Dein Körper dankt dir.
        </p>
      </div>

      <button
        onClick={onHome}
        className="w-full rounded-2xl active:scale-95 transition-transform"
        style={{
          background: '#fafafa', color: '#0a0a0a',
          padding: '18px',
          fontFamily: 'Anton, sans-serif',
          fontSize: 20,
          letterSpacing: '0.08em',
        }}
      >
        ZURÜCK ZUR ÜBERSICHT
      </button>
    </div>
  );
}

// ====================================================================
// ROOT
// ====================================================================

export default function App() {
  const [screen, setScreen] = useState('home');
  const [activeGroup, setActiveGroup] = useState(null);
  const [sessionExercises, setSessionExercises] = useState([]);
  const [sessionTheme, setSessionTheme] = useState({ color: '#D4FF00', tag: 'Daily', short: 'FLEX' });
  const [soundOn, setSoundOn] = useState(true);

  const startSession = (exercises, theme) => {
    setSessionExercises(exercises);
    setSessionTheme(theme);
    setScreen('session');
  };

  const totalSec = sessionExercises.reduce((s, e) => s + e.duration, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Manrope:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; font-family: 'Manrope', sans-serif; }
        .flex-app-shell {
          background: #0a0a0a;
          color: #fafafa;
          min-height: 100vh;
          width: 100%;
          max-width: 460px;
          margin: 0 auto;
          position: relative;
          overflow-x: hidden;
        }
        .flex-app-shell::-webkit-scrollbar { display: none; }
        @media (min-width: 461px) {
          .flex-app-outer {
            min-height: 100vh;
            background:
              radial-gradient(circle at 20% 0%, #1a1a1a 0%, transparent 50%),
              radial-gradient(circle at 80% 100%, #161616 0%, transparent 50%),
              #050505;
            display: flex;
            justify-content: center;
            padding: 20px 0;
          }
          .flex-app-shell {
            border-radius: 28px;
            box-shadow: 0 30px 80px rgba(0,0,0,0.6);
            overflow: hidden;
            min-height: calc(100vh - 40px);
          }
        }
        input::placeholder { color: #555; }
      `}</style>
      <div className="flex-app-outer">
        <div className="flex-app-shell">
          {screen === 'home' && (
            <HomeScreen
              onSelectGroup={(g) => { setActiveGroup(g); setScreen('group'); }}
              onFreeTraining={() => setScreen('free')}
            />
          )}
          {screen === 'group' && activeGroup && (
            <GroupScreen
              group={activeGroup}
              onStart={startSession}
              onBack={() => setScreen('home')}
            />
          )}
          {screen === 'free' && (
            <FreeTrainingScreen
              onStart={startSession}
              onBack={() => setScreen('home')}
            />
          )}
          {screen === 'session' && sessionExercises.length > 0 && (
            <SessionScreen
              exercises={sessionExercises}
              theme={sessionTheme}
              soundOn={soundOn}
              setSoundOn={setSoundOn}
              onExit={() => setScreen('home')}
              onComplete={() => setScreen('complete')}
            />
          )}
          {screen === 'complete' && (
            <CompleteScreen
              theme={sessionTheme}
              exerciseCount={sessionExercises.length}
              totalSec={totalSec}
              onHome={() => setScreen('home')}
            />
          )}
        </div>
      </div>
    </>
  );
}
