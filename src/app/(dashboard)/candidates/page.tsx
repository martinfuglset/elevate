import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function CandidatesPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This is the Candidates page. Add your candidate management features here.</p>
        </CardContent>
      </Card>
    </div>
  );
} 