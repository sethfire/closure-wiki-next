import { Separator } from "../ui/separator";

export default function OperatorFile({ storyTextAudio }: { storyTextAudio: any }) {
  return (
    <div className="grid gap-4">
      {storyTextAudio.map((profile: any, idx: number) => (
        <div className="p-6 bg-muted dark:bg-card rounded-lg shadow" key={idx} style={{ overflowWrap: 'anywhere' }}>
          <h3 className="font-semibold mb-2">{profile.storyTitle}</h3>
          <Separator className="mb-2" />
          {profile.stories && profile.stories[0]?.storyText &&
            <div style={{ whiteSpace: 'pre-line' }}>
              {profile.stories[0].storyText}
            </div>
          }
        </div>
      ))}
    </div>
  )
}