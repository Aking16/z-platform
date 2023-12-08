import { getApiDocs } from '@/lib/swagger';
import ReactSwagger from './react-swagger';
import Navbar from './Navbar';
import { Container } from '@/components/ui/container';

export default async function IndexPage() {
    const spec = await getApiDocs();

    return (
        <>
            <Navbar />
            <Container>
                <ReactSwagger spec={spec} />
            </Container>
        </>
    );
}