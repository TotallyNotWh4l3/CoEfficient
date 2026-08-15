import { Check } from "lucide-react";

export default function ScheduleTagPicker({ tags, selectedTags, onToggle, disabled }) {
    if (tags.length === 0) {
        return <p className="sch-empty-text">No tags yet. Admins can add tags in Manage Tags.</p>;
    }

    return (
        <div className="sch-tag-picker">
            {tags.map((tag) => {
                const isSelected = selectedTags.includes(tag.id);
                return (
                    <button
                        type="button"
                        key={tag.id}
                        disabled={disabled}
                        onClick={() => onToggle(tag.id)}
                        className={`sch-tag-pick${isSelected ? " selected" : ""}`}
                        style={
                            isSelected
                                ? {
                                      background: `${tag.color}22`,
                                      borderColor: tag.color,
                                      color: tag.color,
                                  }
                                : undefined
                        }
                    >
                        <span className="sch-tag-dot" style={{ background: tag.color }} />
                        <span>{tag.id}</span>
                        {isSelected && <Check className="icon-xxs" />}
                    </button>
                );
            })}
        </div>
    );
}
