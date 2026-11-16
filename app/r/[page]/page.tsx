export const dynamic = "force-dynamic";

import { goToPage } from "@/db";

export default async function Page({
   params,
   }: {
    params: Promise<{ page: string }>;
}) {
    const { page } = await params;

    await goToPage(page);

}

