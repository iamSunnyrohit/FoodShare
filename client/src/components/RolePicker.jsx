export const ROLES = [
    { value: 'donor', label: 'Donor', hint: 'I have food' },
    { value: 'receiver', label: 'Receiver', hint: 'NGO or shelter' },
    { value: 'volunteer', label: 'Volunteer', hint: 'I can deliver' },
  ];
  
  export default function RolePicker({ value, onChange }) {
    return (
      <fieldset>
        <legend className="legend">I want to join as a</legend>
        <div className="roles">
          {ROLES.map((r) => (
            <label className="role" key={r.value}>
              <input type="radio" name="role" value={r.value} checked={value === r.value} onChange={(e) => onChange(e.target.value)} />
              <span>{r.label}<small>{r.hint}</small></span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }
  